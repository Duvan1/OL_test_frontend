import { useState, useCallback } from 'react'
import { getMerchants, patchMerchantStatus, deleteMerchant, downloadMerchantsCSV } from '@/services/merchantService'

export function useMerchants(token: string | null) {
  const [merchants, setMerchants] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchMerchants = useCallback(() => {
    if (!token) return
    setLoading(true)
    getMerchants(page, limit, token)
      .then(res => {
        setMerchants(res.data.map((m: any) => ({
          ...m,
          establishments: m.establishments || m.no_establecimientos || 0
        })))
        setTotal(res.meta.total)
      })
      .finally(() => setLoading(false))
  }, [page, limit, token])

  const handleToggle = async (id: number, status: 'ACTIVE' | 'INACTIVE') => {
    if (!token) return
    const newStatus = status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    await patchMerchantStatus(id, newStatus, token)
    fetchMerchants()
  }

  const handleDelete = async (id: number) => {
    if (!token) return
    if (!window.confirm('¿Seguro que deseas eliminar este comerciante?')) return
    await deleteMerchant(id, token)
    fetchMerchants()
  }

  const handleDownloadCSV = async () => {
    if (!token) return
    const blob = await downloadMerchantsCSV(token)
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'reporte-comerciantes.csv'
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  }

  return {
    merchants,
    page,
    setPage,
    limit,
    setLimit,
    total,
    loading,
    fetchMerchants,
    handleToggle,
    handleDelete,
    handleDownloadCSV
  }
} 