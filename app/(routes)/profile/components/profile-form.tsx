"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import AddressFields from "@/components/address-fields"
import { formatPrice } from "@/lib/formatPrice"

export default function ProfileForm() {
  const router = useRouter()
  const { user, token, isAuthenticated, fetchMe, logout } = useAuth()
  const [orders, setOrders] = useState<any[]>([])

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    region: "",
    comuna: "",
    street: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  // Si no está autenticado, redirigir al login
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated])

  // Cargar datos del usuario
  useEffect(() => {
    if (user) {
      setForm({
        username: user.username ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        region: user.address?.region ?? "",
        comuna: user.address?.comuna ?? "",
        street: user.address?.street ?? "",
      })
    }
  }, [user])

  // Obtener datos actualizados al entrar
  useEffect(() => {
    fetchMe()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return
      try {
        const res = await fetch("http://localhost:1337/api/orders/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        setOrders(data.orders ?? [])
      } catch {
        console.error("Error cargando órdenes")
      }
    }
    fetchOrders()
  }, [token])

  const handleSubmit = async () => {
      console.log("ENVIANDO:", {
    username: form.username,
    phone: form.phone,
    address: {
      region: form.region,
      comuna: form.comuna,
      street: form.street,
    },
  })
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const res = await fetch(`http://localhost:1337/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: form.username,
          phone: form.phone,
          address: {
            region: form.region,
            comuna: form.comuna,
            street: form.street,
          },
        }),
      })

      if (!res.ok) throw new Error("Error al actualizar")

        const result = await res.json()
        console.log("RESPUESTA STRAPI:", result) 

      await fetchMe() // recargar datos actualizados
      setSuccess("Perfil actualizado correctamente")
    } catch {
      setError("No se pudo actualizar el perfil")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
<div className="w-full min-h-screen py-16 bg-[url('/IMG_7482.JPG')] bg-cover bg-center bg-no-repeat">
    <div className="max-w-5xl px-4 py-8 mx-auto sm:px-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold text-secondary">Mi perfil</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-secondary p-3 rounded-lg bg-primary underline cursor-pointer"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Layout dos columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Columna izquierda — Datos personales */}
        <div className="p-4 rounded-lg bg-slate-100/90 dark:text-black flex flex-col gap-4">
          <p className="font-semibold">Datos personales</p>
          <Separator />

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
            disabled
            className="bg-white opacity-60"
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Teléfono de contacto"
            value={form.phone}
            onChange={handleChange}
            className="bg-white"
          />

          <p className="font-semibold mt-2">Dirección de envío</p>
          <Separator />
          <AddressFields
            region={form.region}
            comuna={form.comuna}
            street={form.street}
            onChange={(field, value) => setForm((prev) => ({ ...prev, [field]: value }))}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full text-secondary"
          >
            {loading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>

        {/* Columna derecha — Historial de órdenes */}
        <div className="p-4 rounded-lg bg-slate-100/90 dark:text-black flex flex-col gap-4">
          <p className="font-semibold">Mis órdenes</p>
          <Separator />

          {orders.length === 0 ? (
            <p className="text-sm text-gray-500">No tienes órdenes aún.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {orders.map((order) => (
                <li key={order.id} className="p-3 rounded-md bg-white text-sm flex flex-col gap-1 border border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{formatPrice(order.amount)}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                      ${order.statusOrder === "paid" ? "bg-green-100 text-green-700" :
                        order.statusOrder === "pending" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"}`}>
                      {order.statusOrder === "paid" ? "Pagado" :
                       order.statusOrder === "pending" ? "Pendiente" :
                       order.statusOrder === "rejected" ? "Rechazado" : "Cancelado"}
                    </span>
                  </div>
                  <span className="text-gray-500 text-xs">
                    {new Date(order.createdAt).toLocaleDateString("es-CL", {
                      day: "2-digit", month: "long", year: "numeric"
                    })}
                  </span>
                  {order.address && (
                    <span className="text-gray-500 text-xs">
                      {order.address.street}, {order.address.comuna}, {order.address.region}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  </div>
  )
}