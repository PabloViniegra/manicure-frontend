import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserLocalStorage } from '@/types/types'

export const useAuthStore = defineStore('auth', (): {
  user: typeof user,
  token: typeof token,
  username: typeof username,
  isAuthenticated: typeof isAuthenticated,
  setUser: typeof setUser,
  setToken: typeof setToken,
  setUsername: typeof setUsername,
  clearAuth: typeof clearAuth
} => {
  //State
  const user = ref<UserLocalStorage | null>(null)
  const token = ref<string | null>(localStorage.getItem('mnc-token'))
  const username = ref<string | null>(null)
  //Getters
  const isAuthenticated = computed((): boolean => !!token.value)

  // Actions
  const setUser = (userIn: UserLocalStorage): void => {
    user.value = userIn
  }
  const setToken = (tokenIn: string): void => {
    token.value = tokenIn
    localStorage.setItem('mnc-token', tokenIn)
  }

  const setUsername = (usernameIn: string): void => {
    username.value = usernameIn
    localStorage.setItem('mnc-username', usernameIn)
  }

  const clearAuth = (): void => {
    user.value = null
    token.value = null
    localStorage.removeItem('mnc-user')
    localStorage.removeItem('mnc-token')
  }

  return {
    user,
    token,
    username,
    isAuthenticated,
    setUser,
    setToken,
    setUsername,
    clearAuth
  }

})
