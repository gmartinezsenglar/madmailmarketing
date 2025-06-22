'use client'

import { useParams } from "next/navigation"
import { Trash2 } from 'lucide-react'
import { useState, useEffect } from "react"
import Link from 'next/link';


type Contacto = {
  id_contacto: number
  nombre: string
  email: string
}

export default function DetalleLista() {
  const { id } = useParams()

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [contactos, setContactos] = useState<Contacto[]>([])
  const [nombre, setNombre] = useState("")

  useEffect(() => {
    if (!id) return;
      fetch(`/api/clientes/${id}`)
        .then(res => res.json())
        .then(data => {
          setContactos(data.listas_contactos_contactos.map((c: any) => c.contactos))
          setNombre(data.nombre)
        })
    }, [id])

  
  return (
    <div className="text-black min-h-screen border-[16px] border-sky-400 bg-gradient-to-br from-white via-blue-50 to-sky-100 rounded-2xl shadow-2xl pt-16 px-6">
      <div>
        <h1 className="text-black text-2xl font-bold mb-4">{nombre}</h1>
        <div className="mb-5">
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            {mostrarFormulario ? "Cerrar" : "Agregar un contacto"}
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mx-2">
            <Link href="/clientes">
            ← Volver a Lista de Clientes
            </Link>
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
        <ul className="space-y-4 mb-3">
          {contactos.map((contacto) => (
            <li
              key={contacto.id_contacto}
              className="block p-4 border rounded hover:bg-gray-300 transition"
            >
              <p><strong>{contacto.nombre}</strong></p>
              <p className="text-sm text-gray-500">{contacto.email}</p>
              <Trash2 className="text-black cursor-pointer" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
