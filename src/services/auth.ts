import { apiService } from '@/api/api'
import type { UserRegister, UserRegisterResponse, UserLogin, Token, User } from '@/types/types'

export const register = async (userIn: UserRegister): Promise<UserRegisterResponse> => {
  const { data } = await apiService.post<UserRegisterResponse>('/auth/register', userIn)
  return data
}

export const login = async (userIn: UserLogin): Promise<Token> => {
  const params = new URLSearchParams()
  params.append('username', userIn.username)
  params.append('password', userIn.password)

  const { data } = await apiService.post('/auth/login', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  return data
}

export const getMe = async (): Promise<User> => {
  const { data } = await apiService.get<User>('/auth/me')
  return data
}
