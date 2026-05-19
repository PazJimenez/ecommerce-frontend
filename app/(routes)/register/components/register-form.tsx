"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function RegisterForm() {
  const router = useRouter()
  const { register } = useAuth()

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError("Por favor completa todos los campos")
      return
    }

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    setLoading(true)
    setError("")

    try {
      await register(form.username, form.email, form.password)
      router.push("/")
    } catch (err: any) {
      setError(err.message ?? "Error al registrarse")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen py-16 bg-[url('/IMG_7482.JPG')] bg-cover bg-center bg-no-repeat">
      <div className="max-w-md px-4 py-8 mx-auto sm:px-6 bg-primary/50 rounded-sm">
        <h1 className="mb-5 text-3xl font-bold text-secondary">Crear cuenta</h1>

        <div className="p-4 rounded-lg bg-slate-100/90 dark:text-black flex flex-col gap-4">
          <Input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={form.username}
            onChange={handleChange}
            className="bg-white"
          />
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
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={form.confirmPassword}
            onChange={handleChange}
            className="bg-white"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full text-secondary"
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </Button>

          <p className="text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="underline font-semibold">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}