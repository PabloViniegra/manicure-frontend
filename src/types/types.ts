export interface UserRegister {
  email: string
  full_name: string
  password: string
  role: string
  name: string
  phone: string
  address: string
}
export interface UserRegisterResponse {
  email: string
  full_name: string
  id: number
  is_active: boolean
  role: string
  created_at: string
}

export interface UserLogin {
  username: string
  password: string
}

export interface Token {
  access_token: string
  token_type: string
}

export interface UserLocalStorage {
  id: number
  name: string
  email: string
}

export interface User {
  email: string
  full_name: string
  role: UserRole
  id: number
  client_id: number
}

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
  STAFF = 'staff',
}

export interface ClientSimple {
  name: string
  email: string
  phone: string
  address: string
  id: number
  created_at: string
}

export interface ServiceSimple {
  name: string
  description: string
  price: number
  duration: number // in minutes
  id: number
}

export interface ServiceResponse {
  info: {
    page: number
    per_page: number
    total: number
    total_pages: number
  }
  data: ServiceSimple[]
}

export interface Appointment {
  client_id: number
  date: string
  notes: string
  id: number
  client: ClientSimple
  services: ServiceSimple[]
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
  service_ids: number[]
}

export interface AppointmentResponse {
  info: {
    page: number
    per_page: number
    total: number
    total_pages: number
  }
  data: Appointment[]
}

export interface AppointmentCreate {
  client_id: number
  date: string
  notes: string
  service_ids: number[]
}

export type QalendarEvent = {
  id: string | number
  title: string
  description?: string
  with: string
  time: {
    start: string
    end: string
  }
  color?: string
  isEditable?: boolean
}

export interface Slot {
  start: string
  end: string
}
