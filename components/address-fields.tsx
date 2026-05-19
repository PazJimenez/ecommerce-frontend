"use client"

import { regiones } from "@/lib/chile-locations"
import { Input } from "@/components/ui/input"

interface AddressFieldsProps {
  region: string
  comuna: string
  street: string
  onChange: (field: string, value: string) => void
}

export default function AddressFields({ region, comuna, street, onChange }: AddressFieldsProps) {
  const comunasDisponibles = regiones.find((r) => r.nombre === region)?.comunas ?? []

    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange("region", e.target.value)
      onChange("comuna", "")
    }

    const handleComunaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange("comuna", e.target.value)
    }

    const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange("street", e.target.value)
    }

  return (
    <>
      <select
        value={region}
        onChange={handleRegionChange}
        className="w-full h-10 px-3 rounded-md border border-input bg-white text-sm dark:text-black"
      >
        <option value="">Selecciona una región</option>
        {regiones.map((r) => (
          <option key={r.id} value={r.nombre}>
            {r.nombre}
          </option>
        ))}
      </select>

      <select
        value={comuna}
        onChange={handleComunaChange}
        disabled={!region}
        className="w-full h-10 px-3 rounded-md border border-input bg-white text-sm dark:text-black disabled:opacity-50"
      >
        <option value="">Selecciona una comuna</option>
        {comunasDisponibles.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <Input
        type="text"
        placeholder="Calle y número"
        value={street}
        onChange={handleStreetChange}
        disabled={!comuna}
        className="bg-white disabled:opacity-50"
      />
    </>
  )
}