import { register, login } from '@/services/auth'
import { ref, type Ref } from 'vue'
import { useMutation, QueryClient } from '@tanstack/vue-query'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import type { UserRegister, UserRegisterResponse, UserLogin, Token } from '@/types/types'
import { useRouter } from 'vue-router'

export const useAuth = (): {
  user: typeof user
  username: typeof username
  isAuthenticated: boolean
  login: (userIn: UserLogin) => Promise<Token>
  isLoging: Ref<boolean>
  register: (userIn: UserRegister) => Promise<UserRegisterResponse>
  isRegistering: Ref<boolean>
  error: typeof error
  logout: () => void
} => {
  const router = useRouter()
  const authStore = useAuthStore()
  const { user, username } = storeToRefs(authStore)
  const queryClient = new QueryClient()
  const error = ref<string | null>(null)

  const registerMutation = useMutation({
    mutationFn: async (userIn: UserRegister): Promise<UserRegisterResponse> => register(userIn),
    onSuccess: (data: UserRegisterResponse): void => {
      authStore.setUser({ id: data.id, name: data.full_name, email: data.email })
      router.push('/login')
    },
    onError: (err: Error): void => {
      error.value = err.message
    },
  })

  const loginMutation = useMutation({
    mutationFn: async (userIn: UserLogin): Promise<Token> => login(userIn),
    onSuccess: (data: Token, variables: UserLogin): void => {
      authStore.setToken(data.access_token)
      authStore.setUsername(variables.username)
      router.push('/')
    },
    onError: (err: Error): void => {
      error.value = err.message
    },
  })

  function logout(): void {
    authStore.clearAuth()
    queryClient.removeQueries({ queryKey: ['user'] })
  }

  return {
    user,
    username,
    isAuthenticated: authStore.isAuthenticated,
    login: loginMutation.mutateAsync,
    isLoging: loginMutation.isPending,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    error,
    logout,
  }
}
