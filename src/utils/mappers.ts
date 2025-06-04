import type { Appointment, Slot } from '@/types/types'
import type { QalendarEvent } from '@/types/types'
import { normalizeDateString } from './date'

export function mapAppointmentsToEvents(appointments: Appointment[]): QalendarEvent[] {
  return appointments.map((appt): QalendarEvent => ({
    id: String(appt.id),
    title: appt.services.map((s): string => s.name).join(', '),
    description: appt.notes,
    with: appt.client.name ?? '',
    time: {
      start: normalizeDateString(appt.date),
      end: calcEndTime(appt.date, appt.services)
    },
    color: appt.status === 'confirmed' ? 'green' : appt.status === 'pending' ? 'yellow' : 'red',
    isEditable: true
  }))
}

export function mapBlockedSlotsToevents(slots: Slot[]): QalendarEvent[] {
  return slots.map((slot, idx): QalendarEvent => ({
    id: `blocked-${idx}`,
    title: 'No disponible',
    description: 'Este horario está bloqueado',
    with: '-',
    time: {
      start: normalizeDateString(slot.start),
      end: normalizeDateString(slot.end)
    },
    color: 'red',
    isEditable: false
  }))
}

export function calcEndTime(start: string, services: Appointment['services']): string {
  const startDate = new Date(start)
  const totalDuration = services.reduce((acc, s): number => acc + (s.duration ?? 0), 0)
  const endDate = new Date(startDate.getTime() + totalDuration * 60000)
  const yyyy = endDate.getFullYear()
  const mm = String(endDate.getMonth() + 1).padStart(2, '0')
  const dd = String(endDate.getDate()).padStart(2, '0')
  const hh = String(endDate.getHours()).padStart(2, '0')
  const min = String(endDate.getMinutes()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`
}
