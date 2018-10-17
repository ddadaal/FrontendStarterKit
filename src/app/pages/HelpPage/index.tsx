import { KnownRouteConfig, RouteType } from "../../routing/RouteConfig";
import routeIndexPage, { pathJoin } from "../../routing/RouteIndexPage";
import lang from "../../internationalization/LocaleStore/lang";
import { NavItemProps } from "../../layouts/nav/NavItemProps";
import React from "react";
import { generateSideNavLayout } from "../../layouts/SideNavLayout";

function getSubRoute(pathname: string) {
  const pathItems = pathname.split("/").filter((x) => !!x);
  return pathItems.slice(1).join("/");
}

const root = lang().help;

const routes = [{
  path: "tos",
  textId: root.tos,
  component: import("./TermOfServicePage"),
  match: (pathname) => getSubRoute(pathname).startsWith("tos"),
  iconName: "global",
  exact: true,
},
];

const routerRoutes = [
  { type: RouteType.Redirect, path: "", exact: true, to: "/help/tos" },
  ...routes.map((x) => ({ type: RouteType.Async, path: x.path, exact: x.exact, component: x.component })),
] as KnownRouteConfig[];

const layoutRoutes = routes.map((x) => ({
  path: pathJoin("help", x.path),
  textId: x.textId,
  iconName: x.iconName,
  match: x.match,
})) as NavItemProps[];

export default routeIndexPage(
  routerRoutes,
  generateSideNavLayout({ routes: layoutRoutes}),
);
