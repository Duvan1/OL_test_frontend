import { apiClient } from '@/lib/api-client'

const ENDPOINT = '/api/merchants'

export const getMerchants = (page: number, limit: number, token: string) =>
  apiClient.get<any>(`${ENDPOINT}?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const patchMerchantStatus = (id: number, status: 'ACTIVE' | 'INACTIVE', token: string) =>
  apiClient.patch(`${ENDPOINT}/${id}/status`, { status }, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const deleteMerchant = (id: number, token: string) =>
  apiClient.delete(`${ENDPOINT}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

export const downloadMerchantsCSV = async (token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}${ENDPOINT}/report`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.blob()
} 