import { apiClient, ApiError } from "@/lib/apiClient";
import { Role, ServerUser, User, normalizeUser } from "@/types/user";

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  role: Role;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthToken {
  access_token: string;
  token_type: string;
  role: Role;
  user: ServerUser;
}

export interface AuthResult {
  token: AuthToken;
  user: User;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface MessageResponse {
  message: string;
}

export interface ResetPasswordPayload {
  token: string;
  new_password: string;
}

export async function register(payload: RegisterPayload): Promise<User> {
  try {
    const res = await apiClient.post<ServerUser, RegisterPayload>(
      "/auth/register",
      payload,
    );
    return normalizeUser(res);
  } catch (err) {
    if (err instanceof ApiError) {
      if (err.status === 409)
        throw new Error("An account with this email already exists.");
      if (err.status === 422)
        throw new Error("Please check your details and try again.");
    }
    throw new Error("Registration failed. Please try again.");
  }
}

export async function login(payload: LoginPayload): Promise<AuthResult> {
  try {
    const res = await apiClient.post<AuthToken, LoginPayload>(
      "/auth/login",
      payload,
    );
    return {
      token: res,
      user: normalizeUser(res.user),
    };
  } catch (err) {
    if (err instanceof ApiError) {
      if (err.status === 401) throw new Error("Incorrect email or password.");
      if (err.status === 404)
        throw new Error("No account found with this email.");
    }
    throw new Error("Login failed. Please try again.");
  }
}

export async function logout(): Promise<void> {
  try {
    await apiClient.post("/auth/logout");
  } catch {
    throw new Error("Logout failed. Please try again.");
  }
}

export async function forgotPassword(
  payload: ForgotPasswordPayload,
): Promise<MessageResponse> {
  try {
    return await apiClient.post<MessageResponse, ForgotPasswordPayload>(
      "/auth/forgot-password",
      payload,
    );
  } catch (err) {
    if (err instanceof ApiError && err.status === 404)
      throw new Error("No account found with this email address.");
    throw new Error("Could not send reset email. Please try again.");
  }
}

export async function resetPassword(
  payload: ResetPasswordPayload,
): Promise<MessageResponse> {
  try {
    return await apiClient.post<MessageResponse, ResetPasswordPayload>(
      "/auth/reset-password",
      payload,
    );
  } catch (err) {
    if (err instanceof ApiError && err.status === 400)
      throw new Error("Reset link is invalid or has expired.");
    throw new Error("Password reset failed. Please try again.");
  }
}

export async function getMe(): Promise<User> {
  try {
    const res = await apiClient.get<ServerUser>("/auth/me");
    return normalizeUser(res);
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      return null as unknown as User;
    }
    throw err;
  }
}
