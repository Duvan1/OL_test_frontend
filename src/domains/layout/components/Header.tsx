"use client"

import { useAuthStore } from '@/store/authStore'
import styles from '../styles/Header.module.scss'
import UserInfoHeader from './UserInfoHeader'
import { usePathname } from 'next/navigation'

export default function Header() {
  const { user } = useAuthStore()
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className="flex items-center gap-8">
        <img src="/logo.png" alt="Logo OL" className={styles.logo} />
        <nav className={styles.nav}>
          <a
            href="/"
            className={pathname === '/' ? styles.navActive : styles.navLink}
          >
            Lista de comerciantes
          </a>
          <a
            href="/merchants/create"
            className={pathname === '/merchants/create' ? styles.navActive : styles.navLink}
          >
            Crear Formulario
          </a>
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