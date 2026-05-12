import { Suspense } from "react"
import CheckoutForm from "./components/checkout-form"

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <CheckoutForm />
    </Suspense>
  )
}