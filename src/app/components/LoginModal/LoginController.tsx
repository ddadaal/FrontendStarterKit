import { action, computed, observable, runInAction } from "mobx";
import { UserService } from "../../../api/UserService";
import { UserStore } from "../../../stores/UserStore";
import { Inject, Injectable } from "react.di";


export enum LoginState {
  NotLoggedIn,
  LoggingIn,
  LoggedIn
}


export enum LoginErrorType {
  WrongCredential = "WrongCredential",
  ServerError = "ServerError",
  NetworkError = "NetworkError"
}

export interface LoginError {
  type: LoginErrorType
}

export interface LoginServerError extends LoginError {
  type: LoginErrorType.ServerError,
  messages: string[]
}

export interface LoginNetworkError extends LoginError {
  type: LoginErrorType.NetworkError;
  error: any
}


export class LoginFormFields {
  @observable username: string;
  @observable password: string;
  @observable remember: boolean;
  @observable loginAttempted = false;

  @computed get usernameValid() {
    return !this.loginAttempted || !!this.username;
  }

  @computed get passwordValid() {
    return !this.loginAttempted || !!this.password;
  }

  @computed get valid() {
    return this.usernameValid && this.passwordValid;
  }
}

@Injectable
export class LoginController {
  @observable state: LoginState = LoginState.NotLoggedIn;
  @observable fields: LoginFormFields = new LoginFormFields();


  @action public logout = () => {
    this.state = LoginState.NotLoggedIn;
  };

  constructor(@Inject private userService: UserService, @Inject private userStore: UserStore) {
  }

  @computed get loggingIn() {
    return this.state === LoginState.LoggingIn;
  }

  async doLogin() {
    await this.requestLogin(this.fields.username, this.fields.password);
    if (this.fields.remember) {
      this.userStore.remember();
    }
  }

  @action public requestLogin = async (username: string, password: string) => {
    this.state = LoginState.LoggingIn;
    try {
      await this.userStore.login(username, password);
      runInAction("requestLogin success", () => {
        this.state = LoginState.LoggedIn;
      });
    } catch (e) {
      console.log(e);
      const {statusCode, error, response} = e;
      runInAction("requestLogin failed", () => {
        this.state = LoginState.NotLoggedIn;
      });
      if (statusCode === 401) {
        throw {type: LoginErrorType.WrongCredential};
      } else if (error.isNetworkError) {
        throw {type: LoginErrorType.NetworkError, error: error.info};
      } else {
        throw {type: LoginErrorType.ServerError, messages: response!.errorDescriptions } as LoginServerError;
      }
    }


  }
}
