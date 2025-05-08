"use client"

import { useAuthStore } from '@/store/authStore'
import styles from '../styles/Header.module.scss'
import UserInfoHeader from './UserInfoHeader'

export default function Header() {
  const { user } = useAuthStore()

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserInfoHeader />
          </div>
        )}
      </div>
    </header>
  )
} 