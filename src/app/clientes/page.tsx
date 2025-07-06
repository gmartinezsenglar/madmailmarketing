'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Lista = {
  id_lista: number
  nombre: string
}

export default function ListaClientes() {
  const [listas, setListas] = useState<Lista[]>([])
  const empresaId = 1

 useEffect(() => {
  fetch(`/api/clientes?empresaId=${empresaId}`)
    .then((res) => res.json())
    .then((data) => setListas(data)
    )
}, )

  return (
    <div className="pt-16 px-6 text-black min-h-screen border-[16px] border-sky-400 bg-gradient-to-br from-white via-blue-50  to-sky-100 rounded-2xl shadow-2xl">
      <h1 className="text-2xl font-bold mb-4">Lista de Contactos</h1>
      <ul className="space-y-4">
        {listas.map(({ id_lista, nombre }) => (
          <li key={id_lista}>
            <Link href={`/clientes/${id_lista}`} className="block p-4 border rounded hover:bg-gray-300 transition">
              {nombre}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6 mb-4">
        <Link href="/clientes/crear_lista" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-fit mb-4">
          Añadir Nueva Lista
        </Link>
      </div>
    </div>
  )
}
