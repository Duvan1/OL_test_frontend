import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  name: string
  role: 'Administrador' | 'Auxiliar de Registro'
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
  _hasHydrated: boolean
  setHasHydrated: (v: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      _hasHydrated: false,
      setHasHydrated: (v) => set({ _hasHydrated: v })
    }),
    {
      name: 'auth-storage', // clave en localStorage
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated?.(true)
      },
    }
  )
) 