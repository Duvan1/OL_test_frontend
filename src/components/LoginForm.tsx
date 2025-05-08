import styles from './LoginForm.module.scss'

interface LoginFormProps {
  email: string
  setEmail: (v: string) => void
  password: string
  setPassword: (v: string) => void
  terms: boolean
  setTerms: (v: boolean) => void
  error: string
  loading: boolean
  handleSubmit: (e: React.FormEvent) => void
}

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  terms,
  setTerms,
  error,
  loading,
  handleSubmit
}: LoginFormProps) {
  return (
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
  )
} 