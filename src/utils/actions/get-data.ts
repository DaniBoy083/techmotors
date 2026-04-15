import "server-only";

type QueryParamValue = string | number | boolean | null | undefined;

type GetDataOptions = {
  endpoint?: string;
  params?: Record<string, QueryParamValue>;
  init?: RequestInit;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const READ_KEY = process.env.READ_KEY;

function buildUrl(endpoint: string, params: Record<string, QueryParamValue> = {}) {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined.");
  }

  const normalizedBase = API_BASE_URL.replace(/\/$/, "");
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = new URL(`${normalizedBase}${normalizedEndpoint}`);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  }

  if (READ_KEY) {
    url.searchParams.set("read_key", READ_KEY);
  }

  return url.toString();
}

export async function getData<T>({ endpoint = "/objects", params, init }: GetDataOptions = {}) {
  const url = buildUrl(endpoint, params);

  const response = await fetch(url, {
    method: "GET",
    ...init,
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data (${response.status} ${response.statusText}).`);
  }

  return (await response.json()) as T;
}
