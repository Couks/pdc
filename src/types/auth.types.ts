import { BaseUser, UserRole } from "./base.types";

export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: BaseUser;
  token: string;
}
