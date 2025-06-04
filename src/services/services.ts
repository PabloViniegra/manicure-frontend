import { apiService } from '@/api/api'
import type { ServiceResponse } from '@/types/types'

export const getServices = async (
  skip: number = 0,
  limit: number = 100,
  search: string | null = null,
): Promise<ServiceResponse> => {
  const { data } = await apiService.get<ServiceResponse>('/services', {
    params: { skip, limit, search },
  })
  return data
}
