import { isWithinInterval, parseISO, format, eachMinuteOfInterval, setHours, setMinutes, addMinutes, addDays } from 'date-fns'
import { holidays, vacations, workingHours } from '../lib/scheduleConfig'
import type { QalendarEvent } from '@/types/types'
import { normalizeDateString } from './date'

export function isHoliday(dateStr: string): boolean {
  return holidays.includes(dateStr)
}

export function isOnVacation(dateStr: string): boolean {
  const date = parseISO(dateStr)
  return vacations.some((v): boolean =>
    isWithinInterval(date, { start: parseISO(v.start), end: parseISO(v.end) })
  )
}

export function getWorkingSlotsForDay(date: Date): { start: string; end: string }[] {
  const day = date.getDay()
  const config = workingHours.find((d): boolean => d.day === day)
  return config ? config.slots : []
}

export function isSlotAvailable(date: Date, time: string): boolean {
  const dateStr = date.toISOString().slice(0, 10)
  if (isHoliday(dateStr) || isOnVacation(dateStr)) return false
  const slots = getWorkingSlotsForDay(date)
  return slots.some((slot): boolean => {
    return time >= slot.start && time < slot.end
  })
}

export function getBlockedSlotsQalendarEvents(startDate: string, endDate: string): QalendarEvent[] {
  const events: QalendarEvent[] = []
  let current = parseISO(startDate)
  const end = parseISO(endDate)
  while (current <= end) {
    const allSlots = eachMinuteOfInterval(
      { start: setHours(setMinutes(current, 0), 9), end: setHours(setMinutes(current, 0), 19) },
      { step: 15 }
    )

    allSlots.forEach((slotDate): void => {
      const timeStr = format(slotDate, 'HH:mm')
      if (!isSlotAvailable(slotDate, timeStr)) {
        events.push({
          id: `${format(slotDate, 'yyyy-MM-dd')}-${timeStr}`,
          with: '-',
          title: 'No disponible',
          time: {
            start: normalizeDateString(slotDate.toISOString()),
            end: normalizeDateString(addMinutes(slotDate, 15).toISOString()),
          },
          color: 'red',
          isEditable: false
        })
      }
    })
    current = addDays(current, 1)
  }
  return events
}
