import { Injectable } from "react.di";
import { UserService } from "../UserService";
import { UserRole } from "../../models/user/User";
import { LoginResponse } from "../../models/user/LoginResponse";
import { RegisterParams, RegisterResponse } from "../../models/user/Register";
import { EmailValidationRequestReceipt } from "../../models/user/EmailValidation";
import { NetworkError } from "../NetworkResponse";
import { UserProfile } from "../../models/user/UserProfile";

const sampleAvatar = "https://en.gravatar.com/userimage/57315252/e9c37404163b4b2e73fd72003e391aac.jpg?size=200";

@Injectable
export class UserServiceMock extends UserService {

  async login(username: string, password: string): Promise<LoginResponse> {

    if (username === "user" && password === "user") {
      return {
        token: "123",
        role: UserRole.USER,
        avatarUrl: sampleAvatar,
        username,
        email: `${username}@test.com`,
        emailValidated: true,
        expireAt: Date.now().toString(),
      };
    } else {
      throw { statusCode: 401 };
    }
  }

  logout() {

  }

  async register(params: RegisterParams): Promise<RegisterResponse> {
    return {
      token: "123",
      expireAt: "null",
    };
  }

  async requestEmailValidation(token: string): Promise<EmailValidationRequestReceipt> {
    return {
      validationToken: "123",
      expireAt: "123",
    };
  }

  async validateEmail(token: string, code: string, userToken: string): Promise<void> {
    if (Math.random() <= 0.5) {
      throw {
        statusCode: 400,
      } as NetworkError;
    }
  }

  async getUserProfile(username: string): Promise<UserProfile> {
    return {
      username,
      email: "smallda@outlook.com",
      registerDate: "123",
      avatarUrl: sampleAvatar,

    };
  }
}
