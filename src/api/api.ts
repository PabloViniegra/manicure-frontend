import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

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
  (response): AxiosResponse<any, any> => response,
  (error): Promise<never> => {
    if (error.response?.status === 401 && !error.config?.url?.includes('/auth/login')) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)
