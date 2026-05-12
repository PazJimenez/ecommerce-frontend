"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/formatPrice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

type CheckoutStep = "form" | "login-prompt"

export default function CheckoutForm() {
  const router = useRouter()
  const { items, removeAll } = useCart()
  const totalPrice = items.reduce((total, item) => total + item.price, 0)

  const [step, setStep] = useState<CheckoutStep>("form")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Cuando el email pierde el foco, verificamos si ya existe
  const handleEmailBlur = async () => {
    if (!form.email) return

    try {
      const res = await fetch(
        `http://localhost:1337/api/orders/check-email?email=${form.email}`
      )
      const data = await res.json()

      if (data.exists) {
        setStep("login-prompt") // El email ya existe → ofrecer login
      }
    } catch {
      // Si falla la verificación, dejamos seguir como invitado
    }
  }

  // Iniciar sesión y rellenar datos automáticamente
  const handleLogin = async () => {
    setLoading(true)
    setError("")

    try {
      const res = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: form.email,
          password: form.password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError("Contraseña incorrecta")
        setLoading(false)
        return
      }

      // Rellenar datos automáticamente desde el perfil
      setForm((prev) => ({
        ...prev,
        name: data.user.username ?? prev.name,
        address: data.user.address ?? prev.address,
      }))

      setStep("form")
    } catch {
      setError("Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  // Continuar como invitado
  const handleGuestContinue = () => {
    setStep("form")
  }

  // Enviar el pago
  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.address || !form.phone) {
      setError("Por favor completa todos los campos")
      return
    }

    if (items.length === 0) {
      router.push("/")
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch("http://localhost:1337/api/orders/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice,
          email: form.email,
          name: form.name,
          address: form.address,
          phone: form.phone,
        }),
      })

      if (!res.ok) throw new Error("Error iniciando pago")

      const data = await res.json()
      window.location.href = data.redirectUrl

    } catch {
      setError("No se pudo iniciar el pago")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen py-16 bg-[url('/IMG_7482.JPG')] bg-cover bg-center bg-no-repeat">
      <div className="max-w-xl px-4 py-8 mx-auto sm:px-6 bg-primary/50 rounded-sm">
        <h1 className="mb-5 text-3xl font-bold text-secondary">Checkout</h1>

        {/* Resumen del pedido */}
        <div className="p-4 mb-6 rounded-lg bg-slate-100/90 dark:text-black">
          <p className="font-semibold mb-2">Resumen del pedido</p>
          <Separator />
          <div className="flex justify-between mt-3">
            <p>Total</p>
            <p>{formatPrice(totalPrice)}</p>
          </div>
        </div>

        {/* Prompt de login si el email ya existe */}
        {step === "login-prompt" && (
          <div className="p-4 mb-6 rounded-lg bg-slate-100/90 dark:text-black">
            <p className="font-semibold mb-3">
              Este email ya tiene una cuenta. ¿Quieres iniciar sesión?
            </p>
            <Input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              className="mb-3 bg-white"
            />
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <div className="flex gap-3">
              <Button onClick={handleLogin} disabled={loading} className="flex-1">
                {loading ? "Iniciando..." : "Iniciar sesión"}
              </Button>
              <Button variant="outline" onClick={handleGuestContinue} className="flex-1">
                Continuar como invitado
              </Button>
            </div>
          </div>
        )}

        {/* Formulario de datos */}
        {step === "form" && (
          <div className="p-4 rounded-lg bg-slate-100/90 dark:text-black flex flex-col gap-4">
            <Input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={form.name}
              onChange={handleChange}
              className="bg-white"
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleEmailBlur}
              className="bg-white"
            />
            <Input
              type="text"
              name="address"
              placeholder="Dirección de envío"
              value={form.address}
              onChange={handleChange}
              className="bg-white"
            />
            <Input
                type="tel"
                name="phone"
                placeholder="Teléfono de contacto"
                value={form.phone}
                onChange={handleChange}
                className="bg-white"
                />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              onClick={handleSubmit}
              disabled={loading || items.length === 0}
              className="w-full text-secondary"
            >
              {loading ? "Procesando..." : "Ir a pagar"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}