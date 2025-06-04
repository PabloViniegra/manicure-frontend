import { useAppointmentsStore } from '@/stores/appointments'
import { getBlockedSlots } from '@/services/appointments'
import { storeToRefs } from 'pinia'
import { useQuery } from '@tanstack/vue-query'
import { watch, type Ref } from 'vue'
import type { Slot } from '@/types/types'

export function useSlots(): {
  blockedSlots: Ref<Slot[]>
  isLoadingSlots: Ref<boolean>
} {
  const appointmentsStore = useAppointmentsStore()
  const { blockedSlots } = storeToRefs(appointmentsStore)
  const slotsQuery = useQuery({
    queryKey: ['blockedSlots'],
    queryFn: getBlockedSlots
  })

  watch(slotsQuery.data, (newData): void => {
    if (newData) {
      appointmentsStore.setBlockedSlots(newData)
    }
  }, { immediate: true })

  watch(slotsQuery.error, (error): void => {
    if (error instanceof Error) {
      console.error('Error fetching blocked slots:', error.message)
    }
  })

  return {
    blockedSlots,
    isLoadingSlots: slotsQuery.isLoading || slotsQuery.isFetching || slotsQuery.isPending
  }

}
