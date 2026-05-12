// app/(routes)/payment-result/page.tsx
import { Suspense } from "react"
import PaymentResult from "./components/payment-result"

export default function PaymentResultPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <PaymentResult />
    </Suspense>
  )
}