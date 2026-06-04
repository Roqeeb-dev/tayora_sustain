import { apiClient } from "@/lib/apiClient";
import { ServerUser, User, normalizeUser } from "@/types/user";

type RegisterPayload = Pick<User, "name" | "email" | "password">;

type RegisterResponse = ServerUser;

export async function register(payload: RegisterPayload) {
  const res = await apiClient.post<RegisterResponse, RegisterPayload>(
    "/auth/register",
    payload,
  );

  return normalizeUser(res);
}
