import { Suspense } from "react"
import ProfileForm from "./components/profile-form"

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ProfileForm />
    </Suspense>
  )
}