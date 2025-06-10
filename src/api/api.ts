import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const router = useRouter()

export const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiService.interceptors.request.use((config): InternalAxiosRequestConfig => {
  const token = localStorage.getItem('mnc-token')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})


apiService.interceptors.response.use(
  (res): AxiosResponse => res,
  (error): Promise<never> => {
    if (
      error.response &&
      error.response.status === 401 &&
      router.currentRoute.value.path !== '/login'
    ) {
      const authStore = useAuthStore()
      authStore.clearAuth()
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
