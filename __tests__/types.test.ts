import { describe, it, expect } from "vitest";
import { normalizeUser, ServerUser } from "../types/user";

describe("Normalizer tests", () => {
  const mockUser: ServerUser = {
    id: "1234",
    full_name: "Roqeeb",
    email: "roqeeb@test.com",
    role: "admin",
  };

  it("normalizeUser()", () => {
    expect(normalizeUser(mockUser)).toEqual({
      id: "1234",
      name: "Roqeeb",
      email: "roqeeb@test.com",
      role: "admin",
    });
  });
});
