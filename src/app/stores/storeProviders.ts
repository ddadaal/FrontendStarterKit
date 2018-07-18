import { RouterStore } from "../routing/RouterStore";
import { UserStore } from "./UserStore";
import { UserService } from "../api/UserService";
import { HttpService } from "../api/HttpService";
import { UserServiceMock } from "../api/mock/UserServiceMock";


export default function(useMock: boolean) {
  return [
    {provide: UserStore, useClass: UserStore},
  ]
}
