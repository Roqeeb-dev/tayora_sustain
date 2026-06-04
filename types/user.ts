export type Role = "donor" | "requester" | "admin";

export interface ServerUser {
  id: string;
  full_name: string;
  email: string;
  role: Role;

  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;

  createdAt?: Date;
  updatedAt?: Date;
}

export function normalizeUser(data: ServerUser): User {
  return {
    id: data.id,
    name: data.full_name,
    email: data.email,
    role: data.role,
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
    updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
  };
}
