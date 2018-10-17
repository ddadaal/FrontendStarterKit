import { HttpService } from "./HttpService";
import { HttpMethod } from "./utils";
import { Inject, Injectable } from "react.di";
import { LoginResponse } from "../models/user/LoginResponse";
import { EmailValidationRequestReceipt } from "../models/user/EmailValidation";
import { RegisterParams, RegisterResponse } from "../models/user/Register";
import { UserProfile } from "../models/user/UserProfile";

// declare class RSAKey {
//   setPublic(modulus: string, exponent: string);
//
//   encryptB(data: any): any;
// }
//
// declare function getByteArray(data: string);

function encryptPassword(password: string) {
  return password;
}

@Injectable
export class UserService {

  constructor(@Inject private http: HttpService) {
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    password = encryptPassword(password);

    const res = await this.http.fetch({
      path: "user",
      queryParams: {name_mail: username, password},
    });

    return res.response;
  }

  set token(token: string) {
    this.http.token = token;
  }

  logout() {
    this.http.token = "";
  }

  async register(params: RegisterParams): Promise<RegisterResponse> {
    params.password = encryptPassword(params.password);
    const res = await this.http.fetch({
      path: "user",
      body: params,
      method: HttpMethod.POST,
    });

    return res.response;
  }

  async requestEmailValidation(token: string): Promise<EmailValidationRequestReceipt> {
    const res = await this.http.fetch({
      path: "user/validation/email",
      token,
    });

    return res.response;
  }

  async validateEmail(token: string, code: string, userToken: string): Promise<void> {
    await this.http.fetch({
      path: "user/validation/email",
      method: HttpMethod.POST,
      body: {validationToken: token, validationCode: code},
      token: userToken,

    });
  }

  async getUserProfile(username: string): Promise<UserProfile> {
    const res = await this.http.fetch({
      path: `/user/info`,
    });

    return res.response as UserProfile;
  }
}
