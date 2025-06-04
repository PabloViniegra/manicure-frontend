import { apiService } from '@/api/api'
import type { Appointment, AppointmentCreate, AppointmentResponse, Slot } from '@/types/types'



export const getMyAppointments = async (skip: number = 0, limit: number = 100, search: string | null): Promise<AppointmentResponse> => {
  const { data } = await apiService.get('/appointments/my', {
    params: {
      skip,
      limit,
      search,
    },
  })
  return data
}

export const getBlockedSlots = async (): Promise<Slot[]> => {
  const { data } = await apiService.get('/appointments/blocked')
  return data
}

export const createAppointment = async (appointmentIn: AppointmentCreate): Promise<Appointment> => {
  const { data } = await apiService.post<Appointment>('/appointments', appointmentIn)
  return data
}
