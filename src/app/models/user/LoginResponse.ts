export interface LoginResponse {
  token: string;
  jwtRoles: {roleName: string}[];
  email: string;
  avatarUrl: string;
  registerDate: string;
}
