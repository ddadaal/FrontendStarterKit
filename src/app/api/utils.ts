import * as queryString from "querystring";

export function urlJoin(...params: string[]) {
  const re1 = new RegExp('^\\/|\\/$','g');
  const elts = Array.prototype.slice.call(params.filter(x => !!x));
  return elts.map(element => element.replace(re1,"")).join('/');
}

export const NetworkErrorCode = -1;

export function appendQueryString(url: string, params: any) {
  const parsed = queryString.stringify(params);
  if (parsed.length === 0) {
    return url;
  } else {
    return url + "?" + parsed;
  }
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH",
  PUT = "PUT",
}


