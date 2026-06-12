export type Role = "donor" | "requester" | "admin";

export interface ServerUser {
  id: string;
  full_name: string;
  email: string;
  role: Role;
  created_at?: string;
  updated_at?: string;
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
    createdAt: data.created_at ? new Date(data.created_at) : undefined,
    updatedAt: data.updated_at ? new Date(data.updated_at) : undefined,
  };
}
