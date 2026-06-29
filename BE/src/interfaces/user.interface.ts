export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  role?: string;
  created_at?: Date | string;
}

export interface LoginInput {
  email: string;
  password: string;
}
