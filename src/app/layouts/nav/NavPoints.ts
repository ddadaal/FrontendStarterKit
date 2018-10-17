import lang from "../../internationalization/LocaleStore/lang";

export interface NavPoint {
  path: string | RegExp; // 匹配的path，是string的时候用startsWith判断，是RegExp的时候用match判断
  jumpTo?: (pathname: string) => string; // 传给Link的path，支持..返回上一级
  textId: string; //
}

const root = lang().nav.navPoints;

function getInvreqId(pathname: string) {
  const splitted = pathname.split("/").filter((x) => !!x);
  return splitted[1];
}

export const availableNavPoints = [
  { path: "/", textId: root[""] },
  { path: "/register", textId: root.register },
  { path: "/invreq", textId: root.invreq._root },
  {
    path: /\/invreq\/[0-9a-zA-Z]+\/?$/,
    jumpTo: (pathname: string) => `/invreq/${getInvreqId(pathname)}`,
    textId: root.invreq.bought.overview,
  }, {
    path: /\/invreq\/[0-9a-zA-Z]+\/stock/,
    jumpTo: (pathname) => `/invreq/${getInvreqId(pathname)}/stock`,
    textId: root.invreq.bought.stock._root,
  }, {
    path: /\/invreq\/[0-9a-zA-Z]+\/stock\/perform/,
    jumpTo: (pathname) => `invreq/${getInvreqId(pathname)}/stock/perform`,
    textId: root.invreq.bought.stock.perform,
  },  {
    path: /\/invreq\/[0-9a-zA-Z]+\/stock\/attribute/,
    jumpTo: (pathname) => `invreq/${getInvreqId(pathname)}/stock/attribute`,
    textId: root.invreq.bought.stock.attribute,
  }, {
    path: /\/invreq\/[0-9a-zA-Z]+\/stock\/scenario/,
    jumpTo: (pathname) => `invreq/${getInvreqId(pathname)}/stock/scenario`,
    textId: root.invreq.bought.stock.scenario,
  }, {
    path: /\/invreq\/[0-9a-zA-Z]+\/transaction/,
    jumpTo: (pathname) => `/invreq/${getInvreqId(pathname)}/transaction`,
    textId: root.invreq.bought.transaction,
  }, {
    path: /\/invreq\/[0-9a-zA-Z]+\/position\/reallocation/,
    jumpTo: (pathname) => `/invreq/${getInvreqId(pathname)}/position/reallocation`,
    textId: root.invreq.bought.position.reallocation,
  }, {
    path: /\/invreq\/[0-9a-zA-Z]+\/position\/dailyPosition/,
    jumpTo: (pathname) => `/invreq/${getInvreqId(pathname)}/position/dailyPosition`,
    textId: root.invreq.bought.position.dailyPosition,
  }, {
    path: /\/invreq\/[0-9a-zA-Z]+\/setting/,
    jumpTo: (pathname) => `/invreq/${getInvreqId(pathname)}/setting`,
    textId: root.invreq.bought.setting,
  }, {
    path: "/quotation",
    textId: root.quotation._root,
  }, {
    path: "/quotation/news",
    textId: root.quotation.news,
  }, {
    path: "/quotation/stock",
    textId: root.quotation.stock,
  }, {
    path: "/quotation/bond",
    textId: root.quotation.bond,
  }, {
    path: "/quotation/goods",
    textId: root.quotation.goods,
  }, {
    path: "/help",
    textId: root.help._root,
  }, {
    path: "/help/tos",
    textId: root.help.tos,
  }, {
    path: "/help/privacyPolicy",
    textId: root.help.privacyPolicy,
  },
] as NavPoint[];
