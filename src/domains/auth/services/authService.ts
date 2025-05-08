import { apiClient } from '@/lib/api-client'

export const loginService = async (email: string, password: string) => {
  return apiClient.post<{
    data: { access_token: string; user: { name: string; role: string; email: string } }
  }>(
    '/auth/login',
    { email, password }
  )
} 