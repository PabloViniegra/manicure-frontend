import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Appointment, Slot } from '@/types/types'

export const useAppointmentsStore = defineStore('appointments', (): {
  appointments: typeof appointments,
  blockedSlots: typeof blockedSlots,
  setAppointments: (appointmentsIn: Appointment[]) => void,
  setBlockedSlots: (slots: Slot[]) => void,
} => {
  // State
  const appointments = ref<Appointment[]>([])
  const blockedSlots = ref<Slot[]>([])

  // Actions
  const setAppointments = (appointmentsIn: Appointment[]): void => {
    appointments.value = appointmentsIn
  }
  const setBlockedSlots = (slots: Slot[]): void => {
    blockedSlots.value = slots
  }

  return {
    appointments,
    blockedSlots,
    setAppointments,
    setBlockedSlots,
  }
})
