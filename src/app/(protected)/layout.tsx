'use client';

import Header from '@/domains/layout/components/Header';
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { token, user, _hasHydrated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (_hasHydrated && (!token || !user)) {
      router.replace('/login')
    }
  }, [token, user, _hasHydrated, router])

  if (!_hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <span className="text-blue-900 text-lg font-semibold">Cargando...</span>
      </div>
    )
  }

  if (!token || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <span className="text-blue-900 text-lg font-semibold">Cargando...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>{children}</main>
    </div>
  )
} 