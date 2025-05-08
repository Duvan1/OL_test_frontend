"use client"

import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import styles from './Header.module.scss'

export default function Header() {
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <header className={styles.header}>
      <div className="flex items-center gap-8">
        <img src="/logo.png" alt="Logo OL" className={styles.logo} />
        <nav className={styles.nav}>
          <span className={styles.navActive}>Lista de comerciantes</span>
          <span className={styles.navLink}>Crear Formulario</span>
        </nav>
      </div>
      <div className="flex items-center gap-8">
        <span className={styles.benefits}><span className="bg-yellow-200 rounded-full px-2 py-1 text-xs">🏅</span> Beneficios por renovar</span>
        {user && (
          <div className={styles.userBox}>
            <span className={styles.userName}>¡Bienvenido!</span>
            <span>{user.name}</span>
            <span className={styles.userRole}>{user.role}</span>
            <button onClick={handleLogout} className={styles.logout}>Cerrar sesión</button>
          </div>
        )}
      </div>
    </header>
  )
} 