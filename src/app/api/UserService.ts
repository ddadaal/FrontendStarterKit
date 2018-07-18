import { HttpService, NetworkResponse } from "./HttpService";
import { HttpMethod } from "./utils";
import { Inject, Injectable } from "react.di";
import { UserRole } from "../models/user/User";
import { LevelInfo } from "../models/user/LevelInfo";
import { LoginResponse } from "../models/user/LoginResponse";


export interface UserRegisterResponse {
  token: string
}


function encryptPassword(password: string) {
  return password;
}

@Injectable
export class UserService {

  constructor(@Inject private http: HttpService) {
  }

  async login(username: string, password: string): Promise<NetworkResponse<LoginResponse>> {
    password = encryptPassword(password);

    const res = await this.http.fetch({
      path: "account/login",
      queryParams: {username, password}
    });
    if (res.ok) {
      this.http.token = res.response.token;
    }
    return res;
  }

  logout() {
    this.http.token = "";
  }

  async register(username: string, password: string, email: string, role: UserRole): Promise<NetworkResponse<UserRegisterResponse>> {
    password = encryptPassword(password);
    return await this.http.fetch({
      path: "account/register",
      queryParams: {username, password, email, role},
      method: HttpMethod.POST
    });
  }

}
