export interface UserRegister {
  email: string;
  full_name: string;
  password: string;
  role: string;
  name: string;
  phone: string;
  address: string;
}
export interface UserRegisterResponse {
  email: string;
  full_name: string;
  id: number;
  is_active: boolean;
  role: string;
  created_at: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface UserLocalStorage {
  id: number;
  name: string;
  email: string;
}

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
  STAFF = 'staff',
}
