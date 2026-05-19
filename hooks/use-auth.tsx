import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Address {
  region: string
  comuna: string
  street: string
}

interface User {
  id: number
  username: string
  email: string
  phone?: string
  address?: Address
}

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  fetchMe: () => Promise<void>
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        const res = await fetch("http://localhost:1337/api/auth/local", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier: email, password }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data?.error?.message ?? "Error al iniciar sesión")
        }

        set({
          token: data.jwt,
          user: data.user,
          isAuthenticated: true,
        })
      },

      register: async (username, email, password) => {
        const res = await fetch("http://localhost:1337/api/auth/local/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data?.error?.message ?? "Error al registrarse")
        }

        set({
          token: data.jwt,
          user: data.user,
          isAuthenticated: true,
        })
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },

      fetchMe: async () => {
        const token = get().token
        if (!token) return

        const res = await fetch("http://localhost:1337/api/users/me?populate=address", {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) {
          // Token expirado o inválido
          set({ user: null, token: null, isAuthenticated: false })
          return
        }

        const user = await res.json()
        console.log("USUARIO:", user)
        set({ user })
      },
    }),
    {
      name: "auth-storage", // se guarda en localStorage
    }
  )
)