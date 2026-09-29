import { NextResponse } from "next/server";
import { fetchBmsPage } from "@/lib/bms-fetch";

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
const inflight = new Map<string, Promise<{ movies: Movie[]; dates: ShowDate[] }>>();
let refreshPromise: { dateCode: string; promise: Promise<void> } | null = null;
const CACHE_TTL = 7 * 60 * 1000;

const CINEMAS = [
  { name: "Mona 70MM", venueCode: "MCMP", slug: "Mona-Cinema-70mm-Patna-patna" },
  { name: "Elphinstone", venueCode: "ESCP", slug: "Elphinstone-Cinema-Patna-patna" },
];

const IST = "Asia/Kolkata";
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// BookMyShow shows run on IST, so "today" must be computed in Asia/Kolkata
// (Vercel runs in UTC, which is often a different calendar day than Patna).
function todayCode(): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: IST }).format(new Date());
  return parts.replace(/-/g, "");
}

// Local fallback date strip so the UI still lets users pick a date when
// BookMyShow is unreachable (403 / challenge page).
function fallbackDates(fromCode: string, count = 7): ShowDate[] {
  const year = Number(fromCode.slice(0, 4));
  const month = Number(fromCode.slice(4, 6)) - 1;
  const day = Number(fromCode.slice(6, 8));
  const start = Date.UTC(year, month, day);
  const dates: ShowDate[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(start + i * 24 * 60 * 60 * 1000);
    const dateCode = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
    dates.push({
      label: i === 0 ? `Today, ${d.getUTCDate()} ${MONTH_NAMES[d.getUTCMonth()].slice(0, 3)}` : `${d.getUTCDate()} ${MONTH_NAMES[d.getUTCMonth()].slice(0, 3)}`,
      dateCode,
      day: DAY_NAMES[d.getUTCDay()],
      date: String(d.getUTCDate()),
      month: MONTH_NAMES[d.getUTCMonth()],
      year: String(d.getUTCFullYear()),
    });
  }
  return dates;
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

  const html = await fetchBmsPage(url);
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

// Shares a single scrape per date across concurrent requests so we don't
// hammer BookMyShow (repeated hits trigger Cloudflare 403 challenges).
function scrapeShared(dateCode: string): Promise<{ movies: Movie[]; dates: ShowDate[] }> {
  const existing = inflight.get(dateCode);
  if (existing) return existing;

  const promise = scrapeAll(dateCode)
    .then((result) => {
      // Only ever cache non-empty results; empty ones must be retried.
      if (result.movies.length > 0) {
        cache.set(dateCode, { data: result, timestamp: Date.now() });
      }
      return result;
    })
    .finally(() => {
      inflight.delete(dateCode);
    });

  inflight.set(dateCode, promise);
  return promise;
}

function refreshCache(dateCode: string): void {
  if (refreshPromise?.dateCode === dateCode) return;
  refreshPromise = {
    dateCode,
    promise: scrapeShared(dateCode)
      .catch((err) => console.error("Background refresh failed:", err))
      .then(() => { refreshPromise = null; }),
  };
}

export const dynamic = "force-dynamic";

const NO_STORE = { "cache-control": "no-store" };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requested = searchParams.get("date");
  const dateCode = requested && /^\d{8}$/.test(requested) ? requested : todayCode();

  const cached = cache.get(dateCode);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json({ success: true, ...cached.data, lastUpdated: new Date(cached.timestamp).toISOString(), cached: true }, { headers: NO_STORE });
  }
  if (cached) {
    refreshCache(dateCode);
    return NextResponse.json({ success: true, ...cached.data, lastUpdated: new Date(cached.timestamp).toISOString(), cached: true, stale: true }, { headers: NO_STORE });
  }

  try {
    const { movies, dates } = await scrapeShared(dateCode);

    if (movies.length === 0) {
      const fallback = dates.length > 0 ? dates : fallbackDates(dateCode);
      return NextResponse.json(
        {
          success: false,
          movies: [],
          dates: fallback,
          message: "No shows found for this date right now. Pick another date or check BookMyShow for the latest schedule.",
          lastUpdated: new Date().toISOString(),
        },
        { headers: NO_STORE }
      );
    }
    return NextResponse.json({ success: true, movies, dates, lastUpdated: new Date().toISOString(), cached: false }, { headers: NO_STORE });
  } catch (error) {
    console.error("Scraping failed:", error);
    return NextResponse.json(
      {
        success: false,
        movies: [],
        dates: fallbackDates(dateCode),
        message: "Unable to fetch showtimes right now. Please try again, or check BookMyShow for the latest schedule.",
      },
      { status: 503, headers: NO_STORE }
    );
  }
}
