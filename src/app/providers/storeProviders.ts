import { RouterStore } from "../stores/RouterStore";
import { LocaleStore } from "../stores/LocaleStore";
import { UserStore } from "../stores/UserStore";

export default async function(history) {
  const routerStore = new RouterStore(history);
  const localeStore = new LocaleStore();
  await localeStore.init();

  return [
    {provide: RouterStore, useValue: routerStore},
    {provide: UserStore, useClass: UserStore},
    {provide: LocaleStore, useValue: localeStore},
  ]
} 