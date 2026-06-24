import type { Role } from "../types";
import { api } from "./api";

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = LoginPayload & { name: string; confirmPassword: string; role: Exclude<Role, "admin"> };

export const authService = {
  login: async (payload: LoginPayload) => {
    const { data } = await api.post("/auth/login", payload);
    return data;
  },
  register: async (payload: RegisterPayload) => {
    const { data } = await api.post("/auth/register", payload);
    return data;
  },
};
