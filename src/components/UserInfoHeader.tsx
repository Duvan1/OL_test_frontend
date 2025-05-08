import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { useRef, useState, useEffect } from 'react'

export default function UserInfoHeader() {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  if (!user) return null

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div ref={ref} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
      <div onClick={() => setOpen((v) => !v)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1.5px solid #cbd5e1'
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2"/></svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span style={{ color: '#1e3a8a', fontWeight: 700, fontSize: 16 }}>Bienvenido!</span>
          <span style={{ color: '#222', fontSize: 15 }}>{user.name}</span>
          <span style={{ color: '#444', fontSize: 13 }}>{user.role}</span>
        </div>
      </div>
      {open && (
        <div style={{
          position: 'absolute',
          top: '110%',
          right: 0,
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          boxShadow: '0 4px 16px rgba(30,58,138,0.08)',
          minWidth: 160,
          zIndex: 10
        }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              background: 'none',
              border: 'none',
              color: '#ef4444',
              fontWeight: 600,
              textAlign: 'left',
              cursor: 'pointer',
              borderRadius: 8
            }}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
} 