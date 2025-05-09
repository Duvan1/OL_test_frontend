import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: number
  name: string
  email: string
  role: string
}

interface AuthState {
  token: string | null
  user: User | null
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage', // clave en localStorage
    }
  )
) 