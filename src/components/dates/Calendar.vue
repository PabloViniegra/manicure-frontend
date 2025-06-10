<script setup lang="ts">
import 'qalendar/dist/style.css'
import { ref, watchEffect, watch } from 'vue'
import { Qalendar } from 'qalendar'
import { useAppointments } from '@/composables/useAppointments'
import type { QalendarEvent } from '@/types/types'
import { mapAppointmentsToEvents, mapBlockedSlotsToevents } from '@/utils/mappers'
import { config } from '@/lib/qalendarConfig'
import { useSlots } from '@/composables/useSlots'
import { useModal } from '@/composables/useModal'
import CreateAppointmentModal from '@/components/appointments/CreateAppointmentModal.vue'
import DeleteAppointmentModal from '../appointments/DeleteAppointmentModal.vue'
import { getBlockedSlotsQalendarEvents } from '@/utils/calendar'

const { appointments, isLoading } = useAppointments()
const { blockedSlots, isLoadingSlots } = useSlots()
const events = ref<QalendarEvent[]>([])
const { isOpen, open, close } = useModal()
const { isOpen: isDeleteOpen, open: deleteOpen, close: closeDelete } = useModal()
const selectedDate = ref('')
const selectedAppointmentId = ref<number | null>(null)
watchEffect((): void => {
  const apptEvents = appointments.value
    ? mapAppointmentsToEvents(appointments.value).map((e): QalendarEvent => ({ ...e }))
    : []
  const blockedEvents = blockedSlots.value
    ? mapBlockedSlotsToevents(blockedSlots.value).map((e): QalendarEvent => ({ ...e }))
    : []
  const filteredBlockedEvents = blockedEvents.filter(
    (blocked): boolean =>
      !apptEvents.some(
        (appt): boolean =>
          appt.time.start === blocked.time.start && appt.time.end === blocked.time.end,
      ),
  )
  const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1)
  const lastDayOfYear = new Date(new Date().getFullYear(), 11, 31)
  const notWorkedSlots = getBlockedSlotsQalendarEvents(
    firstDayOfYear.toISOString(),
    lastDayOfYear.toISOString(),
  )
  events.value = [...apptEvents, ...filteredBlockedEvents, ...notWorkedSlots]
})

function handleCellClick(event: string): void {
  selectedDate.value = event
  open()
}

function handleDelete(event: number | string): void {
  selectedAppointmentId.value = Number(event)
  deleteOpen()
}

function closeDeleteAndReset(): void {
  closeDelete()
  selectedAppointmentId.value = null
}
</script>
<template>
  <div class="calendar-container is-light-mode">
    <Qalendar
      :events="events"
      :config="config"
      :isLoading="isLoading || isLoadingSlots"
      @datetime-was-clicked="handleCellClick"
      @delete-event="handleDelete"
    />
  </div>
  <CreateAppointmentModal :show="isOpen" :date="selectedDate" @close="close" />
  <DeleteAppointmentModal
    :show="isDeleteOpen"
    @close="closeDeleteAndReset"
    :appointmentId="selectedAppointmentId ?? 0"
  />
</template>
<style scoped>
@import 'qalendar/dist/style.css';
.calendar-container {
  width: 100%;
  height: 800px;
}
</style>
