import { onRequest as apiDownload } from "./api/download.js";

export async function onRequest(context) {
  return apiDownload(context);
}
