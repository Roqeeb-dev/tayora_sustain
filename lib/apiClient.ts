export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

let defaultHeaders: Record<string, string> = {};

export const apiClient = {
  setAuthToken(token: string | null) {
    if (token) defaultHeaders["Authorization"] = token;
    else delete defaultHeaders["Authorization"];
  },
  async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(baseUrl + url, {
      method: options.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        ...defaultHeaders,
        ...options.headers,
      },
      body: options.body,
      credentials: "include",
      signal: options.signal,
    });

    if (res.status === 204) return undefined as T;

    let data: unknown;
    try {
      data = await res.json();
    } catch {
      throw new ApiError(res.status, "Invalid JSON response from server");
    }

    if (!res.ok) {
      const message =
        (data as { message?: string })?.message ??
        `Request failed with status ${res.status}`;
      throw new ApiError(res.status, message, data);
    }

    return data as T;
  },

  async requestForm<T>(
    url: string,
    method: string,
    body: FormData,
  ): Promise<T> {
    const res = await fetch(baseUrl + url, {
      method,
      body,
      credentials: "include",
    });

    if (res.status === 204) return undefined as T;

    let data: unknown;
    try {
      data = await res.json();
    } catch {
      throw new ApiError(res.status, "Invalid JSON response from server");
    }

    if (!res.ok) {
      const message =
        (data as { message?: string })?.message ??
        `Request failed with status ${res.status}`;
      throw new ApiError(res.status, message, data);
    }

    return data as T;
  },

  get<T>(url: string, options?: RequestInit) {
    return this.request<T>(url, { ...options, method: "GET" });
  },

  post<T, B = unknown>(url: string, body?: B) {
    return this.request<T>(url, {
      method: "POST",
      ...(body !== undefined && { body: JSON.stringify(body) }),
    });
  },

  // POST with FormData (file upload)
  postForm<T>(url: string, body: FormData) {
    return this.requestForm<T>(url, "POST", body);
  },

  patch<T, B = unknown>(url: string, body: B) {
    return this.request<T>(url, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  // PATCH with FormData (file upload)
  patchForm<T>(url: string, body: FormData) {
    return this.requestForm<T>(url, "PATCH", body);
  },

  put<T, B = unknown>(url: string, body: B) {
    return this.request<T>(url, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  delete<T>(url: string) {
    return this.request<T>(url, { method: "DELETE" });
  },
};
