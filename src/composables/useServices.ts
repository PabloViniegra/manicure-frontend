import { useQuery } from '@tanstack/vue-query'
import { watch, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { getServices } from '@/services/services'
import { useServicesStore } from '@/stores/services'
import type { ServiceSimple, ServiceResponse } from '@/types/types'

export function useServices(params?: { skip?: number; limit?: number; search?: string | null }): {
  services: Ref<ServiceSimple[]>
  isLoading: Ref<boolean>
} {
  const skip = params?.skip ?? 0
  const limit = params?.limit ?? 100
  const search = params?.search ?? null
  const servicesStore = useServicesStore()
  const { services } = storeToRefs(servicesStore)

  const servicesQuery = useQuery({
    queryKey: ['services', skip, limit, search],
    queryFn: (): Promise<ServiceResponse> => getServices(skip, limit, search),
  })

  watch(
    servicesQuery.data,
    (data): void => {
      if (data) {
        servicesStore.setServices(data.data)
      }
    },
    { immediate: true },
  )

  watch(servicesQuery.error, (error): void => {
    if (error instanceof Error) {
      console.error('Error fetching services:', error.message)
    }
  })

  return {
    services,
    isLoading: servicesQuery.isLoading || servicesQuery.isFetching || servicesQuery.isPending,
  }
}
