import { UserRole } from "../../../models/user/User";
import { NavItemProps } from "../NavItemProps";

export const navRoutes: { [s: string]: NavItemProps } = {
  home: {
    path: "/",
    iconName: "home",
    textId: "nav.home",
    match: (pathname: string) => pathname === "/",
  },
  about: {
    path: "/about",
    iconName: "info-circle",
    textId: "nav.about",
    match: (pathname: string) => pathname.startsWith("/about"),
  },
  // browse: {
  //   path: "/browse",
  //   iconName: "cloud",
  //   id: "nav.browse",
  //   match: (pathname: string) => pathname.startsWith("/browse")
  // },
  // mission: {
  //   path: "/mission",
  //   iconName: "tag-o",
  //   id: "nav.mission",
  //   match: (pathname: string) => pathname.startsWith("/mission")
  // },
  // leaderboard: {
  //   path: "/leaderboard",
  //   iconName: "bars",
  //   id: "nav.leaderboard",
  //   match: (pathname: string) => pathname.startsWith("/leaderboard")
  // },

  // pay: {
  //   path: "/pay",
  //   iconName: "pay-circle-o",
  //   id: "nav.pay",
  //   match: (pathname: string) => pathname.startsWith("/pay")
  // }
};
