const API_KEY = import.meta.env.VITE_FMP_API_KEY;

const BASE_URL = "https://financialmodelingprep.com/api/v3";

export async function fmpFetch<T>(path: string): Promise<T> {
  if (!API_KEY) {
    throw new Error("Missing VITE_FMP_API_KEY");
  }

  const separator = path.includes("?") ? "&" : "?";
  const response = await fetch(`${BASE_URL}${path}${separator}apikey=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`FMP request failed: ${response.status}`);
  }

  return response.json();
}