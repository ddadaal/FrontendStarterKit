import { KnownRouteConfig, RouteType } from "../routing/RouteConfig";
import routeIndexPage from "../routing/RouteIndexPage";
import { FunctionLayout } from "../layouts/FunctionLayout";

const routes = [
  { type: RouteType.Async, path: "help", component: import("./HelpPage")},
  // { type: RouteType.Async, path: "register", exact: false, component: import("./RegisterPage")}
] as KnownRouteConfig[];

export default routeIndexPage(routes, FunctionLayout);
