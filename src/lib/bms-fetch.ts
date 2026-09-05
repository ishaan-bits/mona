import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

const SCRIPT = `
const url = process.env.BMS_URL;
if (!url) { process.stderr.write("No URL\\n"); process.exit(1); }
Promise.all([import("got"), import("http2-wrapper")]).then(([{ default: got }, { default: http2Wrapper }]) => {
  const OP = 1 << 4, EM = 1 << 19;
  function apply(o) {
    if (o.http2 && o.url?.protocol !== "http:") {
      o._unixOptions = { ...o._unixOptions, secureOptions: OP | EM, requestOCSP: true };
      o.request = (u, ro, cb) => http2Wrapper.auto(u, ro, cb);
    }
  }
  const i = got.extend({
    http2: true, followRedirect: true, timeout: { request: 20000 },
    headers: {
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'accept-language': 'en-US,en;q=0.9',
      'accept-encoding': 'gzip, deflate, br',
      'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
      'sec-ch-ua-mobile': '?0', 'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'document', 'sec-fetch-mode': 'navigate', 'sec-fetch-site': 'none',
      'sec-fetch-user': '?1', 'upgrade-insecure-requests': '1',
    },
    https: {
      ciphers: 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-RSA-AES128-SHA:ECDHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA:AES256-SHA',
      signatureAlgorithms: 'ecdsa_secp256r1_sha256:rsa_pss_rsae_sha256:rsa_pkcs1_sha256:ecdsa_secp384r1_sha384:rsa_pss_rsae_sha384:rsa_pkcs1_sha384:rsa_pss_rsae_sha512:rsa_pkcs1_sha512',
      ecdhCurve: 'X25519:prime256v1:secp384r1', minVersion: 'TLSv1', maxVersion: 'TLSv1.3', honorCipherOrder: true,
    },
    hooks: { init: [apply], beforeRedirect: [(o) => apply(o)] },
  });
  i(url).then(r => process.stdout.write(r.body)).catch(e => { process.stderr.write(e.message); process.exit(1); });
});
`;

export async function fetchBmsPage(url: string): Promise<string> {
  try {
    const { stdout } = await execFileAsync("node", ["--input-type=module", "-e", SCRIPT], {
      maxBuffer: 10 * 1024 * 1024,
      timeout: 25000,
      env: { ...process.env, BMS_URL: url },
    });
    return stdout;
  } catch (error: unknown) {
    const err = error as { stderr?: string; message?: string };
    console.error(`fetchBmsPage child process error for ${url}:`, err.stderr || err.message?.substring(0, 200));
    throw error;
  }
}
