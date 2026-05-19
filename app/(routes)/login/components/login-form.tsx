"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()

  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError("Por favor completa todos los campos")
      return
    }

    setLoading(true)
    setError("")

    try {
      await login(form.email, form.password)
      router.push("/") // redirige al inicio después del login
    } catch (err: any) {
      setError(err.message ?? "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen py-16 bg-[url('/IMG_7482.JPG')] bg-cover bg-center bg-no-repeat">
      <div className="max-w-md px-4 py-8 mx-auto sm:px-6 bg-primary/50 rounded-sm">
        <h1 className="mb-5 text-3xl font-bold text-secondary">Iniciar sesión</h1>

        <div className="p-4 rounded-lg bg-slate-100/90 dark:text-black flex flex-col gap-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="bg-white"
          />
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="bg-white"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full text-secondary"
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>

          <p className="text-center text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="underline font-semibold">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}