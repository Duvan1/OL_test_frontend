import { apiClient } from '@/lib/api-client'

export const getMerchants = (page: number, limit: number, token: string) =>
  apiClient.get<any>(`/merchants?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const patchMerchantStatus = (id: number, status: 'ACTIVE' | 'INACTIVE', token: string) =>
  apiClient.patch(`/merchants/${id}/status`, { status }, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const deleteMerchant = (id: number, token: string) =>
  apiClient.delete(`/merchants/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const downloadMerchantsCSV = async (token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/merchants/report`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.blob()
} 