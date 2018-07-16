import { appendQueryString, HttpMethod, NetworkErrorCode, urlJoin } from "./utils";
import { Injectable } from "react.di";

export function createNetworkResponse<T>(statusCode: number, response: T, error?: any) {
  return {
    statusCode,
    response,
    ok: 200 <= statusCode && statusCode < 300,
    error: {
      statusCode: statusCode,
      info: error,
      isNetworkError: statusCode === NetworkErrorCode,
      isServerError: statusCode >= 500
    }
  }
}

export interface NetworkResponse<T = any> {
  statusCode: number;
  response: T;
  ok: boolean;
  error: {
    statusCode: number;
    info: any;
    isNetworkError: boolean;
    isServerError: boolean;
  };
}


export interface FetchInfo {
  path?: string;
  method?: HttpMethod;
  queryParams?: any;
  body?: any;
  headers?: {[s: string]: string};
  mode?: RequestMode;
}

declare var APIROOTURL: string;

@Injectable
export class HttpService {

  token: string  = "";

  async sendFile<T = any>(files: FormData,
                          url: string,
                          token: string,
                          queryParams?: any,
                          headers?: {[s: string]: string}): Promise<NetworkResponse<T>> {
    const actualUrl = urlJoin(APIROOTURL, url);
    try {
      const res = await fetch(appendQueryString(actualUrl, queryParams), {
        method: HttpMethod.POST,
        headers: {Authorization: "Bearer "+token, ...headers},
        body: files
      });
      const json = await res.json();
      return createNetworkResponse(res.status, json);
    } catch (e) {
      return createNetworkResponse(NetworkErrorCode, null, e);
    }
  }

  async fetchRaw(fetchInfo: FetchInfo = {}): Promise<Response> {
    const body = fetchInfo.body
      ? {body: fetchInfo.body}
      : null;

    const mode = fetchInfo.mode
    ? { mode: fetchInfo.mode}
    : {};

    return await fetch(appendQueryString(fetchInfo.path, fetchInfo.queryParams), {
        method: fetchInfo.method || HttpMethod.GET,
        headers: fetchInfo.headers,
        ...mode,
        ...body
      });
  }

  async fetch<T = any>(fetchInfo: FetchInfo = {}): Promise<NetworkResponse<T>> {
    const authHeader = this.token
      ? {"Authorization": `Bearer ${this.token}`}
      : {};
    try {
      const response = await this.fetchRaw({
        ...fetchInfo,
        body: JSON.stringify(fetchInfo.body),
        path: urlJoin(APIROOTURL, fetchInfo.path),
        headers: {
          ...authHeader,
          'Content-Type': 'application/json',
          ...fetchInfo.headers,
        }
      });
      return createNetworkResponse(response.status, (await response.json()));
    } catch (e) {
      return createNetworkResponse(NetworkErrorCode, null, e);
    }




  }
}
