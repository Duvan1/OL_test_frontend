"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import Header from '@/domains/layout/components/Header'
import MerchantTable from '@/domains/merchants/components/MerchantTable'
import { useMerchants } from '@/domains/merchants/hooks/useMerchants'

export default function HomePage() {
  const { token, user } = useAuthStore()
  const router = useRouter()
  const {
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
  } = useMerchants(token)

  useEffect(() => {
    if (!token || !user) {
      router.replace('/login')
      return
    }
    fetchMerchants()
  }, [fetchMerchants, token, user, router])

  if (!token || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <span className="text-blue-900 text-lg font-semibold">Cargando...</span>
      </div>
    )
  }

  const handleEdit = (id: number) => {
    router.push(`/merchants/${id}/editar`)
  }

  const handleCreate = () => {
    router.push('/merchants/create')
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-900">Lista de comerciantes</h1>
          <div className="flex gap-2">
            {user?.role === 'Administrador' && (
              <button onClick={handleDownloadCSV} className="bg-pink-600 text-white px-4 py-2 rounded font-semibold hover:bg-pink-700 transition-colors shadow">Descargar Reporte en CSV</button>
            )}
            <button onClick={handleCreate} className="bg-blue-700 text-white px-4 py-2 rounded font-semibold hover:bg-blue-900 transition-colors shadow">Crear Formulario Nuevo</button>
          </div>
        </div>
        <MerchantTable
          merchants={merchants}
          loading={loading}
          page={page}
          totalPages={totalPages}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
          onEdit={handleEdit}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </main>
      <footer className="bg-blue-900 text-white text-center py-3 text-xs mt-8">Prueba Técnica De Uso Exclusivo de OLSoftware S.A.</footer>
    </div>
  )
}
