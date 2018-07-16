import { NavItemProps } from "../../../stores/NavStore";
import { UserRole } from "../../../models/user/User";

export const navRoutes: { [s: string]: NavItemProps } = {
  browse: {
    path: "/browse",
    iconName: "cloud",
    id: "navbar.browse",
    match: (pathname: string) => pathname.startsWith("/browse")
  },
  mission: {
    path: "/mission",
    iconName: "tag-o",
    id: "navbar.mission",
    match: (pathname: string) => pathname.startsWith("/mission")
  },
  leaderboard: {
    path: "/leaderboard",
    iconName: "bars",
    id: "navbar.leaderboard",
    match: (pathname: string) => pathname.startsWith("/leaderboard")
  },
  about: {
    path: "/about",
    iconName: "info-circle",
    id: "navbar.about",
    match: (pathname: string) => pathname.startsWith("/about")
  },
  pay: {
    path: "/pay",
    iconName: "pay-circle-o",
    id: "navbar.pay",
    match: (pathname: string) => pathname.startsWith("/pay")
  }
};


export type UserConfig = {
  [K in keyof typeof navRoutes]: NavItemProps[]
}

export const NOT_LOGIN_FLAG = "NotLogin";

const leaderboardSubmenus = [
  {
    path: "/leaderboard/exp",
    iconName: "area-chart",
    id: "leaderboard.expBoard",
    match: (pathname: string) => pathname.startsWith("/leaderboard/exp")
  },
  {
    path: "/leaderboard/workerCredits",
    iconName: "credit-card",
    id: "leaderboard.workerCredits",
    match: (pathname: string) => pathname.startsWith("/leaderboard/workerCredits")
  }, {
    path: "/leaderboard/requesterCredits",
    iconName: "credit-card",
    id: "leaderboard.requesterCredits",
    match: (pathname: string) => pathname.startsWith("/leaderboard/requesterCredits")
  }
];

const common = {
  leaderboard: leaderboardSubmenus
};


export const submenuMap: { [K: string]: UserConfig } = {
  [UserRole.ROLE_REQUESTER]: {
    ...common,
    mission: [
      {
        path: "/mission/requester",
        iconName: "tag-o",
        id: "missions.sideMenu.mission",
        match(pathname: string) {
          return pathname == "/mission/requester" || pathname.startsWith("/mission/requester/create")
        }
      },
      {
        path: "/mission/requester/instance",
        iconName: "tag",
        id: "missions.sideMenu.instance",
        match(pathname: string) {
          return pathname.startsWith("/mission/requester/instance")
        }
      }
    ],
    pay: [
      {
        path: "/pay/account",
        iconName: "credit-card",
        id: "pay.payAccount",
        match: (pathname: string) => pathname.startsWith("/pay/account")
      }, {
        path: "/pay/mission",
        iconName: "tag-o",
        id: "pay.payMission",
        match: (pathname: string) => pathname.startsWith("/pay/mission")
      }
    ]
  },
  [UserRole.ROLE_WORKER]: {
    ...common,
    mission: [
      {
        path: "/mission/worker",
        iconName: "tag-o",
        id: "missions.sideMenu.mission",
        match(pathname: string) {
          return pathname.startsWith("/mission/worker")
        }
      },
    ],
    pay: [
      {
        path: "/pay/account",
        iconName: "credit-card",
        id: "pay.payAccount",
        match: (pathname: string) => pathname.startsWith("/pay/account")
      },
    ],
  },
  [UserRole.ROLE_ADMIN]: {
    ...common,
  },
  [NOT_LOGIN_FLAG]: {
    ...common,
  }
};
