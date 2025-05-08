import styles from '../styles/LoginForm.module.scss'

export default function LoginHeader() {
  return (
    <header className={styles.header}>
      <img src="/logo.png" alt="Logo OL" className={styles.logo} />
      <span className={styles.benefits}>
        <span className="bg-yellow-200 rounded-full px-2 py-1 text-xs">🏅</span> Beneficios por renovar
      </span>
    </header>
  )
} 