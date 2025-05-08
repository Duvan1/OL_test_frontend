import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { token, user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!token || !user) {
      router.replace('/login')
    }
  }, [token, user, router])

  if (!token || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <span className="text-blue-900 text-lg font-semibold">Cargando...</span>
      </div>
    )
  }

  return <>{children}</>
} 