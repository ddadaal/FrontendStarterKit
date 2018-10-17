import { Binding } from "react.di";
import { UserService } from "./UserService";
import { UserServiceMock } from "./mock/UserServiceMock";
import { HttpService } from "./HttpService";

export default function(useMock: boolean) {
  return [
    {provide: UserService, useClass: useMock ? UserServiceMock : UserService},
    {provide: HttpService, useClass: HttpService},

  ] as Binding[];
}
