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
const { appointments, isLoading } = useAppointments()
const { blockedSlots, isLoadingSlots } = useSlots()
const events = ref<QalendarEvent[]>([])
const { isOpen, open, close } = useModal()
const selectedDate = ref('')

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
  events.value = [...apptEvents, ...filteredBlockedEvents]
})

function handleCellClick(event: string): void {
  selectedDate.value = event
  open()
}
</script>
<template>
  <div class="calendar-container is-light-mode">
    <Qalendar
      :events="events"
      :config="config"
      :isLoading="isLoading || isLoadingSlots"
      @datetime-was-clicked="handleCellClick"
    />
  </div>
  <CreateAppointmentModal :show="isOpen" :date="selectedDate" @close="close" />
</template>
<style scoped>
@import 'qalendar/dist/style.css';
.calendar-container {
  width: 100%;
  height: 800px;
}
</style>
