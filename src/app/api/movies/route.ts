import { NextResponse } from "next/server";
import { gotScraping } from "got-scraping";

interface ShowDate {
  label: string;
  dateCode: string;
  day: string;
  date: string;
  month: string;
  year: string;
}

interface TheatreShowtime {
  name: string;
  venueCode: string;
  showtimes: string[];
  bookingUrl: string;
  minPrice: string;
}

interface Movie {
  title: string;
  poster: string;
  certification: string;
  duration: string;
  genre: string;
  language: string;
  format: string;
  eventCode: string;
  theatres: TheatreShowtime[];
}

const cache = new Map<string, { data: { movies: Movie[]; dates: ShowDate[] }; timestamp: number }>();
let refreshPromise: { dateCode: string; promise: Promise<void> } | null = null;
const CACHE_TTL = 7 * 60 * 1000;

const CINEMAS = [
  { name: "Mona 70MM", venueCode: "MCMP", slug: "Mona-Cinema-70mm-Patna-patna" },
  { name: "Elphinstone", venueCode: "ESCP", slug: "Elphinstone-Cinema-Patna-patna" },
];

function todayCode(): string {
  const now = new Date();
  return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
}

function extractInitialState(html: string): Record<string, unknown> | null {
  const scriptTag = html.match(/<script[^>]*>\s*window\.__INITIAL_STATE__\s*=\s*(\{[\s\S]*?\})\s*;?\s*<\/script>/);
  if (scriptTag) {
    try { return JSON.parse(scriptTag[1]); } catch { return null; }
  }
  const fallback = html.match(/window\.__INITIAL_STATE__\s*=\s*(\{[\s\S]*?\});/);
  if (fallback) {
    try { return JSON.parse(fallback[1]); } catch { return null; }
  }
  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseState(state: any, cinema: (typeof CINEMAS)[0], dateCode: string): { movies: { title: string; poster: string; certification: string; duration: string; genre: string; language: string; format: string; eventCode: string; theatre: TheatreShowtime }[]; dates: ShowDate[] } {
  const apiData = state?.venueShowtimesFunctionalApi?.queries;
  if (!apiData) return { movies: [], dates: [] };

  const venueStr = JSON.stringify(state?.venueShowtimesNew || {});
  const showDatesMatch = venueStr.match(/"showDates":\[.*?\]/);
  let dates: ShowDate[] = [];
  if (showDatesMatch) {
    try {
      const raw = JSON.parse(`{${showDatesMatch[0]}}`).showDates;
      dates = raw.map((d: { DispDate: string; DateCode: string; Day: string; Date: string; Month: string; Year: string }) => ({
        label: d.DispDate, dateCode: d.DateCode, day: d.Day, date: d.Date, month: d.Month, year: d.Year,
      }));
    } catch {}
  }

  const key = Object.keys(apiData).find((k: string) => k.startsWith("getShowtimesByVenue"));
  if (!key) return { movies: [], dates };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showData: any = apiData[key]?.data?.showDetailsTransformed;
  if (!showData?.Event) return { movies: [], dates };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const movies = showData.Event.map((event: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const child = event.ChildEvents?.[0];
    if (!child) return null;
    const showtimes = (child.ShowTimes || [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((st: any) => {
        const t = st.ShowDateTime;
        if (!t || t.length < 12) return "";
        const h = parseInt(t.substring(8, 10));
        const m = t.substring(10, 12);
        const ap = h >= 12 ? "PM" : "AM";
        const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
        return `${h12}:${m} ${ap}`;
      }).filter(Boolean);
    const imageCode = child.EventImageCode || "";
    return {
      title: event.EventTitle || "",
      poster: imageCode ? `https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/${imageCode}.jpg` : "",
      certification: child.EventCensor || "",
      duration: event.EventDuration ? `${event.EventDuration} min` : "",
      genre: Object.keys(child.EventGenre || {}).filter((g: string) => g !== "GenreMeta").join(", "),
      language: child.EventName?.includes("-") ? child.EventName.split("-").pop()?.trim() || "Hindi" : "Hindi",
      format: child.EventDimension || "2D",
      eventCode: child.EventCode || "",
      theatre: {
        name: cinema.name, venueCode: cinema.venueCode, showtimes,
        bookingUrl: `https://in.bookmyshow.com/buytickets/${cinema.slug}/cinema-patn-${cinema.venueCode}-MT/${dateCode}`,
        minPrice: child.ShowTimes?.[0]?.MinPrice ? `₹${child.ShowTimes[0].MinPrice}` : "",
      },
    };
  }).filter(Boolean);

  return { movies, dates };
}

async function fetchPage(cinema: (typeof CINEMAS)[0], dateCode: string): Promise<{ state: Record<string, unknown> | null; html: string }> {
  const url = `https://in.bookmyshow.com/buytickets/${cinema.slug}/cinema-patn-${cinema.venueCode}-MT/${dateCode}`;

  const response = await gotScraping({
    url,
    headerGeneratorOptions: {
      browsers: [{ name: "chrome", minVersion: 120 }],
      devices: ["desktop"],
      locales: ["en-US"],
    },
  });

  const html = response.body;
  const state = extractInitialState(html);
  return { state, html };
}

async function scrapeAll(dateCode: string): Promise<{ movies: Movie[]; dates: ShowDate[] }> {
  const results = await Promise.all(
    CINEMAS.map(async (cinema) => {
      try {
        const { state } = await fetchPage(cinema, dateCode);
        if (!state) return { movies: [], dates: [] };
        return parseState(state, cinema, dateCode);
      } catch (err) {
        console.error(`Failed to scrape ${cinema.name}:`, err);
        return { movies: [], dates: [] };
      }
    })
  );

  const allDates = results.reduce((best, r) => r.dates.length > best.length ? r.dates : best, [] as ShowDate[]);
  const allMovies = results.flatMap(r => r.movies);
  const seen = new Map<string, Movie>();
  for (const entry of allMovies) {
    const key = entry.title.toLowerCase();
    if (seen.has(key)) {
      const existing = seen.get(key)!;
      if (!existing.theatres.find(t => t.venueCode === entry.theatre.venueCode)) existing.theatres.push(entry.theatre);
    } else {
      seen.set(key, { ...entry, theatres: [entry.theatre] });
    }
  }
  return { movies: Array.from(seen.values()), dates: allDates };
}

function refreshCache(dateCode: string): void {
  if (refreshPromise?.dateCode === dateCode) return;
  refreshPromise = {
    dateCode,
    promise: scrapeAll(dateCode).then(({ movies, dates }) => {
      if (movies.length > 0) cache.set(dateCode, { data: { movies, dates }, timestamp: Date.now() });
    }).catch((err) => console.error("Background refresh failed:", err))
      .then(() => { refreshPromise = null; }),
  };
}

refreshCache(todayCode());

export const revalidate = 300;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateCode = searchParams.get("date") || todayCode();

  const cached = cache.get(dateCode);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json({ success: true, ...cached.data, lastUpdated: new Date(cached.timestamp).toISOString(), cached: true });
  }
  if (cached) {
    refreshCache(dateCode);
    return NextResponse.json({ success: true, ...cached.data, lastUpdated: new Date(cached.timestamp).toISOString(), cached: true, stale: true });
  }

  try {
    const { movies, dates } = await scrapeAll(dateCode);
    cache.set(dateCode, { data: { movies, dates }, timestamp: Date.now() });

    if (movies.length === 0) {
      return NextResponse.json({ success: false, movies: [], dates, message: "No shows available at the moment. Please check BookMyShow for the latest schedule.", lastUpdated: new Date().toISOString() });
    }
    return NextResponse.json({ success: true, movies, dates, lastUpdated: new Date().toISOString(), cached: false });
  } catch (error) {
    console.error("Scraping failed:", error);
    return NextResponse.json({ success: false, movies: [], dates: [], message: "Unable to fetch showtimes. Please check BookMyShow for the latest schedule." }, { status: 500 });
  }
}
