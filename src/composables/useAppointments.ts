import { useQuery, useMutation, QueryClient } from '@tanstack/vue-query'
import { getMyAppointments, createAppointment } from '@/services/appointments'
import { useAppointmentsStore } from '@/stores/appointments'
import type { Appointment, AppointmentCreate, AppointmentResponse } from '@/types/types'
import { watch, type Ref } from 'vue'
import { storeToRefs } from 'pinia'

export function useAppointments(params?: { skip?: number; limit?: number; search?: string | null }): {
  appointments: Ref<Appointment[]>
  isLoading: Ref<boolean>
  createAppointment: (appointmentIn: AppointmentCreate) => Promise<Appointment>
  isCreating: Ref<boolean>
} {
  const queryClient = new QueryClient()
  const skip = params?.skip ?? 0
  const limit = params?.limit ?? 100
  const search = params?.search ?? null
  const appointmentsStore = useAppointmentsStore()
  const { appointments } = storeToRefs(appointmentsStore)
  const appointmentsQuery = useQuery({
    queryKey: ['appointments', skip, limit, search],
    queryFn: (): Promise<AppointmentResponse> => getMyAppointments(skip, limit, search),
  })

  const appointmentsMutation = useMutation({
    mutationFn: (appointmentIn: AppointmentCreate): Promise<Appointment> => createAppointment(appointmentIn),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
    },
    onError: (error): void => {
      if (error instanceof Error) {
        console.error('Error creating appointment:', error.message)
      }
    },
  })

  watch(appointmentsQuery.data, (data): void => {
    if (data) {
      appointmentsStore.setAppointments(data.data)
    }
  }, { immediate: true })

  watch(appointmentsQuery.error, (error): void => {
    if (error instanceof Error) {
      console.error('Error fetching appointments:', error.message)
    }
  })

  return {
    appointments,
    isLoading: appointmentsQuery.isLoading || appointmentsQuery.isFetching || appointmentsQuery.isPending,
    createAppointment: appointmentsMutation.mutateAsync,
    isCreating: appointmentsMutation.isPending,
  }
}
