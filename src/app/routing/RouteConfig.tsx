import React from 'react';

export enum RouteType {
  Async,
  Redirect
}

export interface RouteConfig {
  path: string;
  exact?: boolean;
  type: RouteType;
}

export interface AsyncRouteConfig extends RouteConfig {
  type: RouteType.Async;
  component: Promise<any>;
}

export interface RedirectRouteConfig extends RouteConfig {
  type: RouteType.Redirect;
  to: string;
}

export type KnownRouteConfig = AsyncRouteConfig | RedirectRouteConfig;

