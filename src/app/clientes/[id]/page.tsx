'use client'

import { useParams } from "next/navigation"
import { listaContactos } from "@/app/clientes_simulado"
import { Trash2 } from 'lucide-react'
import { useState } from "react"

export default function DetalleLista() {
  const { id } = useParams()
  const lista = listaContactos.find((unaLista) => unaLista.id === id)

  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  if (!lista) return <div className="p-4">Lista no encontrada</div>

  return (
    <div className="flex flex-col min-h-screen text-black px-6 py-8">
      <div>
        <h1 className="text-black text-2xl font-bold mb-4">{lista.nombre}</h1>
        <div className="mb-5">
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            {mostrarFormulario ? "Cerrar" : "Agregar un contacto"}
          </button>
        </div>
        {mostrarFormulario && (
        <form>
          <div className="mb-8 space-y-4">
            <input
              type="text"
              placeholder="Nombre"
              required
              className="w-full border-b-2 border-gray-400 focus:border-blue-600 py-2 outline-none"
            />
            <input
              type="email"
              required
              placeholder="Correo electrónico"
              className="w-full border-b-2 border-gray-400 focus:border-blue-600 py-2 outline-none"
            />
            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Guardar contacto
            </button>
          </div>
        </form>
        )}
        <ul className="space-y-4">
          {lista.contactos.map((contacto) => (
            <li
              key={contacto.id}
              className="block p-4 border rounded hover:bg-gray-100 transition"
            >
              <p><strong>{contacto.nombre}</strong></p>
              <p className="text-sm text-gray-500">{contacto.correo}</p>
              <Trash2 className="text-black cursor-pointer" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
