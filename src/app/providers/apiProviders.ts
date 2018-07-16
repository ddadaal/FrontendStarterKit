import { Binding } from "react.di";
import { UserService } from "../api/UserService";
import { UserServiceMock } from "../api/mock/UserServiceMock";
import { HttpService } from "../api/HttpService";


const useMock = false;

export default [
  {provide: UserService, useClass: useMock ? UserServiceMock : UserService},
  {provide: HttpService, useClass: HttpService}
] as Binding[];
