import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ServiceSimple } from '@/types/types'

export const useServicesStore = defineStore(
  'services',
  (): {
    services: typeof services
    setServices: (servicesIn: ServiceSimple[]) => void
  } => {
    const services = ref<ServiceSimple[]>([])

    const setServices = (servicesIn: ServiceSimple[]): void => {
      services.value = servicesIn
    }

    return {
      services,
      setServices,
    }
  },
)
