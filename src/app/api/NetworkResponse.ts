export interface NetworkError {
  statusCode: number;
  info: any;
  isNetworkError: boolean;
  isServerError: boolean;
}

export interface NetworkResponse<T = any> {
  statusCode: number;
  response: T;
}
