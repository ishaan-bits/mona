import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";

const execFileAsync = promisify(execFile);

export async function fetchBmsPage(url: string): Promise<string> {
  const scriptPath = path.join(process.cwd(), "scripts", "bms-scrape.mjs");
  try {
    const { stdout } = await execFileAsync("node", [scriptPath, url], {
      maxBuffer: 10 * 1024 * 1024,
      timeout: 25000,
    });
    return stdout;
  } catch (error: unknown) {
    const err = error as { stderr?: string; message?: string };
    console.error(`fetchBmsPage child process error for ${url}:`, err.stderr || err.message?.substring(0, 200));
    throw error;
  }
}
