import { ref } from 'vue'

export function useModal() {
  const isOpen = ref(false)

  function open(): void {
    isOpen.value = true
  }

  function close(): void {
    isOpen.value = false
  }

  return { isOpen, open, close }
}
