import { apiClient } from "@/lib/apiClient";
import { Role, ServerUser, User, normalizeUser } from "@/types/user";

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  role: Role;
}

export type RegisterResponse = ServerUser;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthToken {
  access_token: string;
  token_type: string;
  role: Role;
}

export type ForgotPasswordPayload = Pick<User, "email">;

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordPayload {
  token: string;
  new_password: string;
}

export async function register(payload: RegisterPayload) {
  const res = await apiClient.post<RegisterResponse, RegisterPayload>(
    "/auth/register",
    payload,
  );

  return normalizeUser(res);
}

export async function login(payload: LoginPayload) {
  const res = await apiClient.post<AuthToken, LoginPayload>(
    "/auth/login",
    payload,
  );

  return res;
}

export async function forgotPassword(payload: ForgotPasswordPayload) {
  const res = await apiClient.post<
    ForgotPasswordResponse,
    ForgotPasswordPayload
  >("/auth/forgot-password", payload);

  return res;
}

export async function resetPassword(payload: ResetPasswordPayload) {
  const res = await apiClient.post<
    ForgotPasswordResponse,
    ResetPasswordPayload
  >("/auth/reset-password", payload);

  return res;
}
