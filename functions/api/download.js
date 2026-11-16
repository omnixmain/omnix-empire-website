// Cloudflare Pages Function: /api/download
// Resolves MediaFire landing page to direct file download URL and redirects (or returns JSON)

const KNOWN_APPS = {
  ott: "https://www.mediafire.com/file/kkcfxwtsxnm4qt8/OMNIX_OTT_v38_3.4.2_Release_16-11-2026.apk/file",
  "omnix-ott": "https://www.mediafire.com/file/kkcfxwtsxnm4qt8/OMNIX_OTT_v38_3.4.2_Release_16-11-2026.apk/file",
  om18x: "https://www.mediafire.com/file/iq8ov5xfj11mmqu/OM18X_v1.2_2026-11-10.apk/file"
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
};

async function extractMediaFireDirectLink(pageUrl) {
  const res = await fetch(pageUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9"
    }
  });

  if (!res.ok) {
    throw new Error(`MediaFire HTTP ${res.status}`);
  }

  const html = await res.text();

  // Pattern 1: aria-label="Download file" href="..."
  let match = html.match(/aria-label=["']Download file["'][^>]*href=["']([^"']+)["']/i);
  if (match && match[1]?.startsWith("http")) return match[1];

  // Pattern 2: id="downloadButton" href="..."
  match = html.match(/id=["']downloadButton["'][^>]*href=["']([^"']+)["']/i);
  if (match && match[1]?.startsWith("http")) return match[1];

  // Pattern 3: href to downloadXXXX.mediafire.com
  match = html.match(/href=["'](https?:\/\/download\d*\.mediafire\.com\/[^"']+)["']/i);
  if (match && match[1]) return match[1];

  // Pattern 4: any downloadXXXX.mediafire.com URL in script or HTML
  match = html.match(/https?:\/\/download\d*\.mediafire\.com\/[a-zA-Z0-9_\-\.\/]+/i);
  if (match && match[0]) return match[0];

  return null;
}

export async function onRequest(context) {
  const { request } = context;

  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  const url = new URL(request.url);
  const appParam = url.searchParams.get("app");
  const rawUrl = url.searchParams.get("url") || url.searchParams.get("link");
  const wantsJson = url.searchParams.get("json") === "true" || request.headers.get("accept")?.includes("application/json");

  let targetUrl = rawUrl;
  if (!targetUrl && appParam) {
    targetUrl = KNOWN_APPS[appParam.toLowerCase()];
  } else if (targetUrl && KNOWN_APPS[targetUrl.toLowerCase()]) {
    targetUrl = KNOWN_APPS[targetUrl.toLowerCase()];
  }

  if (!targetUrl) {
    return new Response(JSON.stringify({ success: false, error: "Missing 'url' or 'app' parameter" }), {
      status: 400,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
    });
  }

  try {
    const directUrl = await extractMediaFireDirectLink(targetUrl);

    if (!directUrl) {
      if (wantsJson) {
        return new Response(JSON.stringify({ success: false, fallbackUrl: targetUrl, error: "Direct link not found in page" }), {
          status: 404,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
        });
      }
      return Response.redirect(targetUrl, 302);
    }

    if (wantsJson) {
      return new Response(JSON.stringify({ success: true, directUrl, sourceUrl: targetUrl }), {
        status: 200,
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate"
        }
      });
    }

    // Direct browser redirect to APK download URL (initiates download directly)
    return new Response(null, {
      status: 302,
      headers: {
        ...CORS_HEADERS,
        "Location": directUrl,
        "Cache-Control": "no-cache, no-store, must-revalidate"
      }
    });
  } catch (err) {
    if (wantsJson) {
      return new Response(JSON.stringify({ success: false, fallbackUrl: targetUrl, error: err.message }), {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
      });
    }
    return Response.redirect(targetUrl, 302);
  }
}
