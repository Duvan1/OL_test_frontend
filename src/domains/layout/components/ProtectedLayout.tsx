import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { token, user, logout } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!token || !user || !isTokenValid(token)) {
      logout();
      router.replace('/login')
    }
  }, [token, user, logout, router])

  if (!token || !user || !isTokenValid(token)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <span className="text-blue-900 text-lg font-semibold">Cargando...</span>
      </div>
    )
  }

  return <>{children}</>
} 