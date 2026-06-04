export type Role = "supplier" | "requester" | "admin";

export interface ServerUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;

  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;

  createdAt: Date;
  updatedAt: Date;
}

export function normalizeUser(data: ServerUser): User {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role,
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
    updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
  };
}
