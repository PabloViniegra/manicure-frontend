import axios, { type InternalAxiosRequestConfig } from 'axios'
import router from '@/router'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

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
  response => response,
  error => {
    if (error.response?.status === 401 && !error.config?.url?.includes('/auth/login')) {
      router.push('/login')
    }
    return Promise.reject(error)
  },
)
