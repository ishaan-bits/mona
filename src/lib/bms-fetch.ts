import { gotScraping } from "got-scraping";

const MAX_ATTEMPTS = 3;

export class BmsFetchError extends Error {}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isValidBmsPage(body: string, statusCode: number): boolean {
  if (statusCode !== 200) return false;
  if (!body.includes("window.__INITIAL_STATE__")) return false;
  return body.length > 50000;
}

export async function fetchBmsPage(url: string): Promise<string> {
  let lastReason = "unknown";

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await gotScraping({
        url,
        useHeaderGenerator: false,
        timeout: { request: 25000 },
        retry: { limit: 0 },
        headers: {
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
          "accept-language": "en-US,en;q=0.9",
          "sec-ch-ua": '"Not_A Brand";v="8", "Chromium";v="120"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "none",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
        },
      });

      if (isValidBmsPage(response.body, response.statusCode)) {
        return response.body;
      }

      lastReason = `status ${response.statusCode}, ${response.body.length} bytes, hasState=${response.body.includes(
        "__INITIAL_STATE__"
      )}`;
    } catch (err) {
      lastReason = err instanceof Error ? err.message : String(err);
    }

    if (attempt < MAX_ATTEMPTS) {
      await sleep(700 * attempt + Math.random() * 500);
    }
  }

  throw new BmsFetchError(`BookMyShow request failed after ${MAX_ATTEMPTS} attempts (${lastReason})`);
}
