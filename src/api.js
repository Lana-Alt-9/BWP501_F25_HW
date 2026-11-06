const API_BASE =
  process.env.REACT_APP_API_URL ||
  "http://localhost:8080/php/rr11/rr11/src/backend";

export function apiFetch(endpoint, options = {}) {
  return fetch(`${API_BASE}/${endpoint}`, {
    ...options,
    credentials: "include",
  });
}
