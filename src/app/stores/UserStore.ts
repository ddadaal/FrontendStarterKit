import { action, computed, observable, runInAction } from "mobx";
import { User, UserRole } from "../models/user/User";
import { UserService } from "../api/UserService";
import { localStorage } from './UiUtil';
import { Inject, Injectable } from "react.di";
import { HttpService } from "../api/HttpService";
import { RouterStore } from "./RouterStore";

const USER_LOCALSTORAGE_KEY = "user";

@Injectable
export class UserStore {
  @observable user: User = null;

  @computed get loggedIn() {
    return !!this.user;
  }

  get token() {
    return this.user ? this.user.token : null;
  }

  @computed get isAdmin() {
    return this.user && this.user.role === UserRole.ROLE_ADMIN;
  }

  @action logout() {
    this.user = null;
    this.httpService.token = "";
    this.userService.logout();
    this.clearUser();
  };

  jumpToProfile(username: string, role: UserRole) {
    this.routerStore.jumpTo(`/self/dashboard?username=${username}&role=${role}`);
  }


  @action async login(username: string, password: string) {
    const { response, ok, error, statusCode } = await this.userService.login(username, password);

    if (!ok) {
      throw { response, error, statusCode};
    }
    runInAction(() => {
      this.user = new User({
        username: username,
        token: response.token,
        role: response.jwtRoles[0].roleName as UserRole,
        email: response.email,
        avatarUrl: response.avatarUrl
      });
    });

  };

  remember() {
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(this.user));
  }

  clearUser() {
    localStorage.removeItem(USER_LOCALSTORAGE_KEY);
  }

  constructor(@Inject private userService: UserService, @Inject private httpService: HttpService, @Inject private routerStore: RouterStore) {
    const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    if (user) {
      try {
        this.user = new User(JSON.parse(user));
        httpService.token = this.user.token;
      } catch (ignored) {
        console.log(ignored);
      }
    }
  }
}
