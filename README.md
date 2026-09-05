# The Premiere Square — Mona 70MM & Elphinstone, Patna

A multi-page, dynamic, interactive Next.js website for **The Premiere Square** (Mona 70MM & Elphinstone), Patna's iconic heritage cinema destination.

## Features

- **Live Showtimes** — Scrapes real-time movie data from BookMyShow via Playwright
- **Date Picker** — Browse movies for today or upcoming days (4-day range from BMS)
- **Theatre Selection Dialog** — Click any movie card to see showtimes separated by venue (Mona 70MM vs Elphinstone)
- **Direct Booking** — Each showtime links directly to that theatre's BMS booking page
- **Heritage Story** — Dedicated page tracing the Kataruka family's cinema legacy from 1930 to present
- **Facilities** — Detailed view of both venues: screens, sound systems, seating, concessions
- **Location & Contact** — Map, directions, parking info, phone numbers
- **Responsive Design** — Works across mobile, tablet, and desktop
- **Dark Theme with Gold Accents** — Inspired by [district.in](https://district.in)'s cinematic aesthetic

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Scraping:** Playwright (headless Chromium)
- **Language:** TypeScript

## Getting Started

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Run development server
npm run dev
```

The site runs at [http://localhost:3001](http://localhost:3001).

## Project Structure

```
src/
├── app/
│   ├── api/movies/route.ts    # BookMyShow scraper + cache
│   ├── page.tsx               # Home page
│   ├── heritage/page.tsx      # Cinema heritage story
│   ├── now-showing/page.tsx   # Live movies + date picker
│   ├── facilities/page.tsx    # Venue facilities
│   └── location/page.tsx      # Map, contact, directions
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ScrollReveal.tsx       # Intersection observer animation
│   ├── DateSelector.tsx       # Date pill picker
│   └── TheatreSelectionDialog.tsx
└── globals.css                # Design system, animations, utilities
```

## How the Scraper Works

1. Playwright launches headless Chromium on API request
2. Opens both Mona and Elphinstone BMS cinema pages in parallel
3. Extracts movie data from `window.__INITIAL_STATE__`
4. Merges showtimes by movie title, grouped per theatre
5. Results are cached for 7 minutes with stale-while-revalidate
6. Cache is pre-warmed on server start for instant first load

## Environment

- Node.js 18+
- Playwright with Chromium

## License

Private — The Premiere Square, Patna
