// request.ts
interface RequestOptions extends RequestInit {
  timeout?: number;
  retry?: number;
  retryDelay?: number;
}

class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  private getFullUrl(url: string): string {
    if (url.startsWith("http")) return url;
    return this.baseUrl + url;
  }

  private async handleResponse(response: Response): Promise<any> {
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `HTTP Error: ${response.status}`);
      }
      return data;
    } else {
      const text = await response.text();
      if (!response.ok) {
        throw new Error(text || `HTTP Error: ${response.status}`);
      }
      return text;
    }
  }

  private async makeRequest(
    url: string,
    options: RequestOptions = {}
  ): Promise<any> {
    const {
      timeout = 10000,
      retry = 0,
      retryDelay = 1000,
      ...fetchOptions
    } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    let lastError: Error | null = null;

    for (let i = 0; i <= retry; i++) {
      try {
        const response = await fetch(this.getFullUrl(url), {
          ...fetchOptions,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        return this.handleResponse(response);
      } catch (error) {
        lastError = error as Error;

        if (i < retry) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
      }
    }

    clearTimeout(timeoutId);
    if (lastError) {
      throw lastError;
    } else {
      throw new Error("Request failed without specific error");
    }
  }

  // GET 请求
  async get<T = any>(
    url: string,
    options?: Omit<RequestOptions, "method" | "body">
  ): Promise<T> {
    return this.makeRequest(url, {
      ...options,
      method: "GET",
    });
  }

  // POST 请求
  async post<T = any>(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, "method" | "body">
  ): Promise<T> {
    const headers = new Headers(options?.headers);

    let body: BodyInit | undefined;
    if (data && typeof data === "object" && !(data instanceof FormData)) {
      headers.set("Content-Type", "application/json");
      body = JSON.stringify(data);
    }

    return this.makeRequest(url, {
      ...options,
      method: "POST",
      headers,
      body,
    });
  }

  // PUT 请求
  async put<T = any>(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, "method" | "body">
  ): Promise<T> {
    const headers = new Headers(options?.headers);

    let body: BodyInit | undefined;
    if (data && typeof data === "object" && !(data instanceof FormData)) {
      headers.set("Content-Type", "application/json");
      body = JSON.stringify(data);
    }

    return this.makeRequest(url, {
      ...options,
      method: "PUT",
      headers,
      body,
    });
  }

  // DELETE 请求
  async delete<T = any>(
    url: string,
    options?: Omit<RequestOptions, "method" | "body">
  ): Promise<T> {
    return this.makeRequest(url, {
      ...options,
      method: "DELETE",
    });
  }
}

// 创建默认实例
const http = new HttpClient("/api");
// 添加默认导出
export default http;
export { HttpClient, http };
export type { RequestOptions };
