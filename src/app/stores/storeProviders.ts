import { UserStore } from "./UserStore";
import { UiStore } from "./UiStore";

export default function(useMock: boolean) {
  return [
    { provide: UserStore, useClass: UserStore },
    UiStore,
  ];
}
