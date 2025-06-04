import { useQuery } from '@tanstack/vue-query'
import { getMyAppointments } from '@/services/appointments'
import { useAppointmentsStore } from '@/stores/appointments'
import type { Appointment, AppointmentResponse } from '@/types/types'
import { watch, type Ref } from 'vue'
import { storeToRefs } from 'pinia'

export function useAppointments(params?: { skip?: number; limit?: number; search?: string | null }): {
  appointments: Ref<Appointment[]>
  isLoading: Ref<boolean>
} {
  const skip = params?.skip ?? 0
  const limit = params?.limit ?? 100
  const search = params?.search ?? null
  const appointmentsStore = useAppointmentsStore()
  const { appointments } = storeToRefs(appointmentsStore)
  const appointmentsQuery = useQuery({
    queryKey: ['appointments', skip, limit, search],
    queryFn: (): Promise<AppointmentResponse> => getMyAppointments(skip, limit, search),
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
  }
}
