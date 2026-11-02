const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const apiBaseUrl = configuredApiUrl
  ? (configuredApiUrl.startsWith("http")
      ? configuredApiUrl
      : `https://${configuredApiUrl}`
    ).replace(/\/+$/, "")
  : import.meta.env.DEV
    ? "http://localhost:3000"
    : "";

export function apiUrl(path) {
  if (!apiBaseUrl) {
    throw new Error("VITE_API_URL is not configured for this deployment.");
  }

  return `${apiBaseUrl}/${path.replace(/^\/+/, "")}`;
}
