import * as moment from "moment";

export enum UserRole {
  ROLE_REQUESTER = "ROLE_REQUESTER",
  ROLE_WORKER = "ROLE_WORKER",
  ROLE_ADMIN = "ROLE_ADMIN"
}


export class User {
  username: string;
  role: UserRole;
  token: string;
  email: string;
  avatarUrl: string;
  registerDate: moment.Moment;


  constructor(params: Partial<User>) {
    Object.assign(this, params);
    this.registerDate = moment(params.registerDate);
  }

}
