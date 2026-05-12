// app/(routes)/payment-result/components/payment-result.tsx
"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"

type PaymentStatus = "loading" | "paid" | "rejected" | "cancelled" | "pending" | "error"

export default function PaymentResult() {
  const searchParams = useSearchParams()
  console.log(searchParams)
  const token = searchParams.get("token")
  const [status, setStatus] = useState<PaymentStatus>("loading")
  const { removeAll } = useCart()

  useEffect(() => {
    if (!token) { setStatus("error"); return; }

    const checkStatus = async () => {
      try {
        const res = await fetch(`http://localhost:1337/api/orders/status?token=${token}`)
        if (!res.ok) throw new Error()
        const data = await res.json()
        setStatus(data.status)
      } catch {
        setStatus("error")
      }
    }

    checkStatus()
  }, [token])

  useEffect(() => {
    if (status === "paid") {
      removeAll()
    }
  }, [status])

    useEffect(() => {
    console.log("TOKEN:", token)
    console.log("TODOS LOS PARAMS:", searchParams.toString())
    }, [token])

  const views: Record<PaymentStatus, { title: string; message: string; color: string }> = {
    loading:   { title: "Verificando pago...",         message: "Por favor espera.",               color: "text-gray-500"   },
    paid:      { title: "¡Pago exitoso! 🎉",            message: "Tu orden fue confirmada.",        color: "text-green-600"  },
    rejected:  { title: "Pago rechazado ❌",             message: "No se pudo procesar tu pago.",   color: "text-red-600"    },
    cancelled: { title: "Pago anulado",                message: "La transacción fue cancelada.",   color: "text-yellow-600" },
    pending:   { title: "Pago pendiente ⏳",             message: "Esperando confirmación.",         color: "text-blue-500"   },
    error:     { title: "Error inesperado",            message: "No pudimos verificar tu pago.",   color: "text-red-600"    },
  }

  const { title, message, color } = views[status]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className={`text-3xl font-bold ${color}`}>{title}</h1>
      <p className="text-muted-foreground">{message}</p>
      <Link href="/" className="underline text-sm">Volver al inicio</Link>
    </div>
  )
}