import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

function makeScript(url: string): string {
  const escapedUrl = url.replace(/'/g, "\\'");
  return `
import('got').then(({ default: got }) =>
  import('http2-wrapper').then(({ default: http2Wrapper }) => {
    const SSL_OP_TLSEXT_PADDING = 1 << 4;
    const SSL_OP_NO_ENCRYPT_THEN_MAC = 1 << 19;

    function applyTlsOptions(options) {
      if (options.http2 && options.url?.protocol !== 'http:') {
        options._unixOptions = {
          ...options._unixOptions,
          secureOptions: SSL_OP_TLSEXT_PADDING | SSL_OP_NO_ENCRYPT_THEN_MAC,
          requestOCSP: true,
        };
        options.request = (url, requestOptions, callback) => {
          return http2Wrapper.auto(url, requestOptions, callback);
        };
      }
    }

    const instance = got.extend({
      http2: true,
      followRedirect: true,
      timeout: { request: 20000 },
      headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v3;q=0.7',
        'accept-language': 'en-US,en;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
      },
      https: {
        ciphers: 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-RSA-AES128-SHA:ECDHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA:AES256-SHA',
        signatureAlgorithms: 'ecdsa_secp256r1_sha256:rsa_pss_rsae_sha256:rsa_pkcs1_sha256:ecdsa_secp384r1_sha384:rsa_pss_rsae_sha384:rsa_pkcs1_sha384:rsa_pss_rsae_sha512:rsa_pkcs1_sha512',
        ecdhCurve: 'X25519:prime256v1:secp384r1',
        minVersion: 'TLSv1',
        maxVersion: 'TLSv1.3',
        honorCipherOrder: true,
      },
      hooks: {
        init: [applyTlsOptions],
        beforeRedirect: [(opts) => { applyTlsOptions(opts); }],
      },
    });

    instance('${escapedUrl}')
      .then(r => { process.stdout.write(r.body); })
      .catch(e => { process.stderr.write(e.message); process.exit(1); });
  })
);
`;
}

export async function fetchBmsPage(url: string): Promise<string> {
  try {
    const { stdout } = await execFileAsync("node", ["--input-type=module", "-e", makeScript(url)], {
      maxBuffer: 10 * 1024 * 1024,
      timeout: 25000,
      cwd: process.cwd(),
    });
    return stdout;
  } catch (error: unknown) {
    const err = error as { stderr?: string; message?: string };
    console.error(`fetchBmsPage child process error for ${url}:`, err.stderr || err.message?.substring(0, 200));
    throw error;
  }
}
