import { NavItemProps } from "../NavItemProps";
import { lang } from "../../../internationalization";

const root = lang().nav;

export const mainNavs = [{
  path: "/",
  iconName: "home",
  textId: root.home,
  match: (pathname: string) => pathname === "/",
},  {
  path: "/help",
  iconName: "info-circle",
  textId: root.help,
  match: (pathname: string) => pathname.startsWith("/help"),
},
] as NavItemProps[];
