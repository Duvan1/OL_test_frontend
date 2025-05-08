"use client"

import styles from '@/domains/auth/styles/LoginForm.module.scss'
import LoginForm from '@/domains/auth/components/LoginForm'
import LoginHeader from '@/domains/auth/components/LoginHeader'
import { useLogin } from '@/domains/auth/hooks/useLogin'

export default function LoginPage() {
  const loginProps = useLogin()

  return (
    <div className={styles.loginContainer}>
      <LoginHeader />
      <main className="flex flex-1 items-center justify-center">
        <LoginForm {...loginProps} />
      </main>
    </div>
  )
} 