import { ref } from 'vue'

export const config = ref({
  week: {
    startsOn: 'monday',
    nDays: 7,
    scrollToHour: 8,
  },
  month: {
    showTrailingAndLeadingDates: true,
  },
  locale: 'es-ES',
  style: {
    fontFamily: 'Roboto',
    colorSchemes: {
      light: {
      },
    },
    isDark: false,
  },
  defaultMode: 'week',
  isSilent: true,
  showCurrentTime: true,
})
