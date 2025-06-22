'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Link from "next/link";

export default function CrearLista() {
  const router = useRouter()

  const [nombreLista, setNombreLista] = useState('')
  const [contactosExistentes, setContactosExistentes] = useState<{ id_contacto: number; nombre: string; email: string }[]>([])
  const [contactosSeleccionados, setContactosSeleccionados] = useState<number[]>([])
  const [formularioNuevosContactos, setFormularioNuevosContactos] = useState([{ nombre: '', email: '' }])

  useEffect(() => {
    fetch('/api/contactos')
      .then(res => res.json())
      .then(setContactosExistentes)
  }, [])

  function toggleContacto(id: number) {
    if (contactosSeleccionados.includes(id)) {
      setContactosSeleccionados(contactosSeleccionados.filter(c => c !== id))
    } else {
      setContactosSeleccionados([...contactosSeleccionados, id])
    }
  }

  function actualizarNuevoContacto(index: number, campo: 'nombre' | 'email', valor: string) {
    const nuevos = [...formularioNuevosContactos]
    nuevos[index][campo] = valor
    setFormularioNuevosContactos(nuevos)
  }

  const agregarContacto = () => {
    setFormularioNuevosContactos([...formularioNuevosContactos, { nombre: '', email: '' }])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const nuevosContactosFiltrados = formularioNuevosContactos.filter(c => c.nombre && c.email)

    try {
      const res = await fetch('/api/crear_lista', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombreLista,
          contactosExistentesIds: contactosSeleccionados,
          nuevosContactos: nuevosContactosFiltrados,
          empresaId: 1, 
        }),
      })

      const data = await res.json()
      alert(data.message)
      router.push('/clientes')
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }

  return (
    <div className="text-black min-h-screen border-[16px] border-sky-400 bg-gradient-to-br from-white via-blue-50 to-sky-100 rounded-2xl shadow-2xl pt-16 px-6">
      <div className="relative">
        <Link href="/clientes">
          <button className="absolute top-0 right-0 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            ← Volver a Lista de Clientes
          </button>
        </Link>
      </div>
      <h1 className="text-black text-2xl font-bold mb-4">Crear Lista de Contactos</h1>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-6">
          <label className="block text-lg mb-2">Nombre de Lista</label>
          <input
            type="text"
            value={nombreLista}
            onChange={e => setNombreLista(e.target.value)}
            placeholder="Ingrese Nombre de Lista"
            required
            className="w-full border-b-2 border-gray-400 focus:border-blue-600 focus:outline-none py-2"
          />
        </div>

        <div className="mb-8">
          <label className="block text-lg mb-2">Seleccionar Contactos Existentes</label>
          <div className="space-y-2">
            {contactosExistentes.map(contacto => (
              <label key={contacto.id_contacto} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={contactosSeleccionados.includes(contacto.id_contacto)}
                  onChange={() => toggleContacto(contacto.id_contacto)}
                  className="form-checkbox"
                />
                <span>
                  {contacto.nombre} - <span className="text-gray-500 text-sm">{contacto.email}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-4">Agregar Nuevos Contactos</h2>
          {formularioNuevosContactos.map((_, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                type="text"
                value={formularioNuevosContactos[index].nombre}
                onChange={e => actualizarNuevoContacto(index, 'nombre', e.target.value)}
                placeholder="Nombre"
                className="flex-1 border-b-2 border-gray-500 focus:border-blue-600 focus:outline-none py-2"
              />
              <input
                type="email"
                value={formularioNuevosContactos[index].email}
                onChange={e => actualizarNuevoContacto(index, 'email', e.target.value)}
                placeholder="Correo"
                className="flex-1 border-b-2 border-gray-500 focus:border-blue-600 focus:outline-none py-2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={agregarContacto}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Agregar otro contacto
          </button>
        </div>

        <button
          type="submit"
          className="bg-gray-500 mb-3 text-white px-4 py-2 rounded hover:bg-gray-600 w-fit"
        >
          Crear Lista
        </button>
      </form>
    </div>
  )
}
