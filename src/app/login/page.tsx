"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api-client'
import { useAuthStore } from '@/store/authStore'
import styles from '@/components/LoginForm.module.scss'

export default function LoginPage() {
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
      const res = await apiClient.post<{ token: string; user: { name: string; role: string; email: string } }>(
        '/auth/login',
        { email, password }
      )
      const user = {
        ...res.user,
        role: res.user.role === 'Administrador' ? 'Administrador' as const : 'Auxiliar de Registro' as const
      }
      login(user, res.token)
      router.push('/')
    } catch (err: any) {
      setError('Credenciales inválidas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.loginContainer}>
      <header className={styles.header}>
        <img src="/logo.png" alt="Logo OL" className={styles.logo} />
        <span className={styles.benefits}><span className="bg-yellow-200 rounded-full px-2 py-1 text-xs">🏅</span> Beneficios por renovar</span>
      </header>
      <main className="flex flex-1 items-center justify-center">
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
          <h2 className={styles.title}>Debes iniciar sesión para acceder</h2>
          <p className={styles.subtitle}>Digita tu documento de identidad del propietario o representante legal y la contraseña</p>
          <input
            type="email"
            placeholder="Correo electrónico"
            className={styles.input}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className={styles.input}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <label className={styles.checkboxLabel}>
            <input type="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)} />
            <span>Acepto los <a href="#" className={styles.checkboxLink}>términos y condiciones de uso</a></span>
          </label>
          {error && <div className={styles.error}>{error}</div>}
          <button
            type="submit"
            className={styles.button}
            disabled={!terms || loading}
          >
            {loading ? 'Iniciando...' : 'Iniciar sesión'}
          </button>
        </form>
      </main>
    </div>
  )
} 