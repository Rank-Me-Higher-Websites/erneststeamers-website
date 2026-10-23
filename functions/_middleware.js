// Send www.erneststeamers.com to the apex host. Every other host, including
// /api/leads on erneststeamers.com, continues to the Pages Function or asset.

const WWW_HOST = "www.erneststeamers.com";

function requestHost(request) {
  const headerHost = request.headers.get("host");
  const raw = headerHost || new URL(request.url).host;
  return raw.split(":")[0].toLowerCase();
}

export async function onRequest(context) {
  if (requestHost(context.request) !== WWW_HOST) {
    return context.next();
  }

  const url = new URL(context.request.url);
  url.protocol = "https:";
  url.hostname = "erneststeamers.com";
  url.port = "";
  return Response.redirect(url.toString(), 301);
}
