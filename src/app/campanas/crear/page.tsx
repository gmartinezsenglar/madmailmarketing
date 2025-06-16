"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"

export default function CrearCampana() {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    objetivo: "",
    fechaInicio: "",
    fechaFin: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos de la campaña:", formData)
    alert("Campaña creada exitosamente (simulado)")
  }

  return (
    <main className="text-black min-h-screen border-[16px] border-sky-400 bg-gradient-to-br from-white via-blue-50 to-sky-100 rounded-2xl shadow-2xl pt-16 px-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 drop-shadow-md">Crear Nueva Campaña</h1>
        <Link href="/campanas">
          <button className="bg-white text-blue-700 font-semibold py-2 px-4 rounded-full hover:bg-blue-100 transition shadow-sm border border-blue-200">
            ← Volver a Campañas
          </button>
        </Link>
      </div>

      {/* Formulario */}
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-sky-200"
        >
          <div className="space-y-6">
            {/* Nombre de la Campaña */}
            <div>
              <label className="block text-gray-800 font-bold mb-3 text-lg">Nombre de la Campaña *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-200 text-gray-800 placeholder-gray-500 bg-white shadow-sm"
                placeholder="Ej: Promoción Verano 2024"
                required
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-gray-800 font-bold mb-3 text-lg">Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-200 resize-none text-gray-800 placeholder-gray-500 bg-white shadow-sm"
                placeholder="Describe el propósito de tu campaña de email marketing..."
              />
            </div>

            {/* Objetivo */}
            <div>
              <label className="block text-gray-800 font-bold mb-3 text-lg">Objetivo Principal</label>
              <input
                type="text"
                name="objetivo"
                value={formData.objetivo}
                onChange={handleInputChange}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-200 text-gray-800 placeholder-gray-500 bg-white shadow-sm"
                placeholder="Ej: Aumentar ventas, Generar leads, Fidelizar clientes"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fecha de Inicio */}
              <div>
                <label className="block text-gray-800 font-bold mb-3 text-lg">Fecha de Inicio</label>
                <input
                  type="date"
                  name="fechaInicio"
                  value={formData.fechaInicio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-200 text-gray-800 bg-white shadow-sm"
                />
              </div>

              {/* Fecha de Fin */}
              <div>
                <label className="block text-gray-800 font-bold mb-3 text-lg">Fecha de Fin</label>
                <input
                  type="date"
                  name="fechaFin"
                  value={formData.fechaFin}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-200 text-gray-800 bg-white shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex justify-end gap-4 mt-10 pt-8 border-t-2 border-gray-200">
            <Link href="/campanas">
              <button
                type="button"
                className="px-8 py-4 border-2 border-gray-400 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-500 transition-all duration-200 font-bold shadow-sm"
              >
                Cancelar
              </button>
            </Link>
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white rounded-xl transition-all duration-200 font-bold shadow-lg transform hover:scale-105"
            >
              Crear Campaña
            </button>
          </div>
        </form>

      </div>
    </main>
  )
}
