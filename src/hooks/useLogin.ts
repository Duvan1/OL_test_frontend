import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { loginService } from '@/services/authService'

export function useLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [terms, setTerms] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const login = useAuthStore((s) => s.login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await loginService(email, password)
      const user = {
        ...res.data.user,
        role: res.data.user.role === 'ADMIN' ? 'Administrador' as const : 'Auxiliar de Registro' as const
      }
      login(user, res.data.access_token)
      router.push('/')
    } catch (err: any) {
      setError('Credenciales inválidas')
    } finally {
      setLoading(false)
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    terms,
    setTerms,
    error,
    loading,
    handleSubmit
  }
} 