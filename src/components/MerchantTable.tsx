import styles from './MerchantTable.module.scss'
import { useAuthStore } from '@/store/authStore'

interface Merchant {
  id: number
  name: string
  phone: string
  email: string
  registration_date: string
  status: 'ACTIVE' | 'INACTIVE'
  establishments: number
}

interface Props {
  merchants: Merchant[]
  loading: boolean
  page: number
  totalPages: number
  limit: number
  setPage: (p: number) => void
  setLimit: (l: number) => void
  onEdit: (id: number) => void
  onToggle: (id: number, status: 'ACTIVE' | 'INACTIVE') => void
  onDelete: (id: number) => void
}

export default function MerchantTable({ merchants, loading, page, totalPages, limit, setPage, setLimit, onEdit, onToggle, onDelete }: Props) {
  const { user } = useAuthStore()
  const PAGE_SIZES = [5, 10, 15]

  return (
    <>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Razón Social</th>
              <th className={styles.th}>Teléfono</th>
              <th className={styles.th}>Correo Electrónico</th>
              <th className={styles.th}>Fecha Registro</th>
              <th className={styles.th}>No. Establecimientos</th>
              <th className={styles.th}>Estado</th>
              <th className={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className={styles.td}>Cargando...</td></tr>
            ) : merchants.length === 0 ? (
              <tr><td colSpan={7} className={styles.td}>No hay comerciantes</td></tr>
            ) : merchants.map((m) => (
              <tr key={m.id}>
                <td className={styles.td}>{m.name}</td>
                <td className={styles.td}>{m.phone}</td>
                <td className={styles.td}>{m.email}</td>
                <td className={styles.td}>{m.registration_date?.slice(0, 10)}</td>
                <td className={styles.tdCenter}>{m.establishments}</td>
                <td className={styles.td}>{m.status === 'ACTIVE' ? (
                  <span className={styles.statusActive}>Activo</span>
                ) : (
                  <span className={styles.statusInactive}>Inactivo</span>
                )}</td>
                <td className={styles.actions}>
                  <button title="Editar" className={`${styles.actionBtn} edit`} onClick={() => onEdit(m.id)}><i className="fas fa-edit" /></button>
                  <button title={m.status === 'ACTIVE' ? 'Inactivar' : 'Activar'} className={`${styles.actionBtn} toggle`} onClick={() => onToggle(m.id, m.status)}><i className={`fas fa-${m.status === 'ACTIVE' ? 'times' : 'check'}`} /></button>
                  {user?.role === 'Administrador' && (
                    <button title="Eliminar" className={`${styles.actionBtn} delete`} onClick={() => onDelete(m.id)}><i className="fas fa-trash" /></button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <span>Items:</span>
        <select value={limit} onChange={e => { setLimit(Number(e.target.value)); setPage(1) }}>
          {PAGE_SIZES.map(size => <option key={size} value={size}>{size}</option>)}
        </select>
        <button disabled={page === 1} onClick={() => setPage(1)} className={styles.pageBtn}>{'<'}</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, page - 3), page + 2).map(p => (
          <button key={p} onClick={() => setPage(p)} className={`${styles.pageBtn} ${p === page ? 'active' : ''}`}>{p}</button>
        ))}
        <button disabled={page === totalPages} onClick={() => setPage(totalPages)} className={styles.pageBtn}>{'>'}</button>
      </div>
    </>
  )
} 