// Cloudflare Pages Function: /api/download
// High-speed direct APK downloader and MediaFire resolver

const DIRECT_DOWNLOADS = {
  ott: "https://github.com/omnixmain/omnix-empire-website/releases/download/v3.4.2/OMNIX_OTT_v38_3.4.2_Release_19-11-2026-1.apk",
  "omnix-ott": "https://github.com/omnixmain/omnix-empire-website/releases/download/v3.4.2/OMNIX_OTT_v38_3.4.2_Release_19-11-2026-1.apk"
};

const KNOWN_APPS = {
  ott: "https://www.mediafire.com/file/pi4k9xoqrb43bg3/OMNIX_OTT_v38_3.4.2_Release_19-11-2026-1.apk/file",
  "omnix-ott": "https://www.mediafire.com/file/pi4k9xoqrb43bg3/OMNIX_OTT_v38_3.4.2_Release_19-11-2026-1.apk/file",
  om18x: "https://www.mediafire.com/file/iq8ov5xfj11mmqu/OM18X_v1.2_2026-11-10.apk/file"
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
};

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

  const appKey = (appParam || "").toLowerCase();

  // 1. Check if high-speed direct CDN download exists for this app
  if (appKey && DIRECT_DOWNLOADS[appKey]) {
    const directUrl = DIRECT_DOWNLOADS[appKey];
    if (wantsJson) {
      return new Response(JSON.stringify({ success: true, directUrl }), {
        status: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
      });
    }
    return Response.redirect(directUrl, 302);
  }

  // 2. Fallback to app target or custom URL
  let targetUrl = rawUrl;
  if (!targetUrl && appKey) {
    targetUrl = KNOWN_APPS[appKey];
  }

  if (!targetUrl) {
    return new Response(JSON.stringify({ success: false, error: "Missing 'url' or 'app' parameter" }), {
      status: 400,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
    });
  }

  // If URL matches OTT, use direct GitHub Release link directly
  if (targetUrl.includes("pi4k9xoqrb43bg3") || targetUrl.includes("nscwqatt4zhupni") || targetUrl.includes("9nuweqr7xkvk462") || targetUrl.includes("kkcfxwtsxnm4qt8") || targetUrl.includes("OMNIX_OTT")) {
    const directUrl = DIRECT_DOWNLOADS.ott;
    if (wantsJson) {
      return new Response(JSON.stringify({ success: true, directUrl }), {
        status: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
      });
    }
    return Response.redirect(directUrl, 302);
  }

  // Fallback redirect for other links
  if (wantsJson) {
    return new Response(JSON.stringify({ success: true, directUrl: targetUrl }), {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
    });
  }
  return Response.redirect(targetUrl, 302);
}
