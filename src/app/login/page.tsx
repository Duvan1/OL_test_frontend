"use client"

import LoginHeader from '@/components/LoginHeader'
import LoginForm from '@/components/LoginForm'
import { useLogin } from '@/hooks/useLogin'
import styles from '@/components/LoginForm.module.scss'

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