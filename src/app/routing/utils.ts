import querystring from 'querystring';
import { RouteComponentProps } from "react-router";

export function parseQueryString<T = any>(props: RouteComponentProps<T> | string): querystring.ParsedUrlQuery {
  if (typeof props === 'string') {
    return querystring.parse(props.substring(1));
  }
  return querystring.parse(props.location.search.substring(1));
}
