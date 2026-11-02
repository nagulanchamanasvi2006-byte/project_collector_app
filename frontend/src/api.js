const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const apiBaseUrl = (
  configuredApiUrl ||
  (import.meta.env.DEV ? "http://localhost:3000" : window.location.origin)
).replace(/\/+$/, "");

export function apiUrl(path) {
  return `${apiBaseUrl}/${path.replace(/^\/+/, "")}`;
}
