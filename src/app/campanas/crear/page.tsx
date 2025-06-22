"use client";

import type React from "react";
import Link from "next/link";
import { useState } from "react";
import { listaContactos } from "@/app/clientes_simulado";

export default function CrearCampana() {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    objetivo: "",
    fechaInicio: "",
    fechaFin: "",
    listasDestinatarios: [] as string[],
  });

  const objetivosPredefinidos = [
    "Aumentar ventas",
    "Generar leads",
    "Fidelizar clientes",
    "Anunciar eventos",
    "Difundir contenido",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleListaDestinatariosChange = (listaId: string) => {
    setFormData((prev) => ({
      ...prev,
      listasDestinatarios: prev.listasDestinatarios.includes(listaId)
        ? prev.listasDestinatarios.filter((id) => id !== listaId)
        : [...prev.listasDestinatarios, listaId],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos de la campaña:", formData);
    alert("Campaña creada exitosamente (simulado)");
  };

  const getTotalContactos = () => {
    return formData.listasDestinatarios.reduce((total, listaId) => {
      const lista = listaContactos.find((l) => l.id === listaId);
      return total + (lista?.contactos.length || 0);
    }, 0);
  };

  return (
    <main className="text-black min-h-screen border-[16px] border-sky-400 bg-gradient-to-br from-white via-blue-50 to-sky-100 rounded-2xl shadow-2xl p-8 m-4">
      {/* Header Moderno */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent drop-shadow-lg">
            Crear Nueva Campaña
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Configura tu campaña de email marketing
          </p>
        </div>
        <Link href="/campanas">
          <button className="bg-white/90 backdrop-blur-sm text-blue-700 font-bold py-3 px-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border-2 border-blue-200 transform hover:scale-105">
            ← Volver a Campañas
          </button> 
        </Link>
      </div>

      {/* Formulario Mejorado */}
      <div className="max-w-5xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border-2 border-sky-200"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Columna Izquierda */}
            <div className="space-y-8">
              {/* Nombre de la Campaña */}
              <div className="group">
                <label className="block text-gray-800 font-bold mb-4 text-xl flex items-center gap-2">
                  📧 Nombre de la Campaña *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-sky-200 focus:border-sky-400 transition-all duration-300 text-gray-800 placeholder-gray-500 bg-white shadow-lg group-hover:shadow-xl"
                  placeholder="Ej: Promoción Verano 2024"
                  required
                />
              </div>

              {/* Descripción */}
              <div className="group">
                <label className="block text-gray-800 font-bold mb-4 text-xl flex items-center gap-2">
                  📝 Descripción
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-sky-200 focus:border-sky-400 transition-all duration-300 resize-none text-gray-800 placeholder-gray-500 bg-white shadow-lg group-hover:shadow-xl"
                  placeholder="Describe el propósito y contenido de tu campaña de email marketing..."
                />
              </div>

              {/* Objetivo Principal */}
              <div className="group">
                <label className="block text-gray-800 font-bold mb-4 text-xl flex items-center gap-2">
                  🎯 Objetivo Principal *
                </label>
                <select
                  name="objetivo"
                  value={formData.objetivo}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-sky-200 focus:border-sky-400 transition-all duration-300 text-gray-800 bg-white shadow-lg group-hover:shadow-xl"
                  required
                >
                  <option value="">Selecciona un objetivo</option>
                  {objetivosPredefinidos.map((objetivo) => (
                    <option key={objetivo} value={objetivo}>
                      {objetivo}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fechas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-gray-800 font-bold mb-4 text-xl flex items-center gap-2">
                    📅 Fecha de Inicio
                  </label>
                  <input
                    type="date"
                    name="fechaInicio"
                    value={formData.fechaInicio}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-sky-200 focus:border-sky-400 transition-all duration-300 text-gray-800 bg-white shadow-lg group-hover:shadow-xl"
                  />
                </div>

                <div className="group">
                  <label className="block text-gray-800 font-bold mb-4 text-xl flex items-center gap-2">
                    📅 Fecha de Fin
                  </label>
                  <input
                    type="date"
                    name="fechaFin"
                    value={formData.fechaFin}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-sky-200 focus:border-sky-400 transition-all duration-300 text-gray-800 bg-white shadow-lg group-hover:shadow-xl"
                  />
                </div>
              </div>
            </div>

            {/* Columna Derecha */}
            <div className="space-y-8">
              {/* Lista de Destinatarios */}
              <div className="group">
                <label className="block text-gray-800 font-bold mb-4 text-xl flex items-center gap-2">
                  👥 Listas de Destinatarios *
                </label>
                <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
                  <p className="text-gray-600 mb-4 font-medium">
                    Selecciona una o más listas de contactos:
                  </p>
                  <div className="space-y-3">
                    {listaContactos.map((lista) => (
                      <label
                        key={lista.id}
                        className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.listasDestinatarios.includes(
                            lista.id
                          )}
                          onChange={() =>
                            handleListaDestinatariosChange(lista.id)
                          }
                          className="w-5 h-5 text-sky-400 border-2 border-gray-300 rounded focus:ring-sky-200"
                        />
                        <div className="flex-1">
                          <div className="font-bold text-gray-800">
                            {lista.nombre}
                          </div>
                          <div className="text-sm text-gray-600">
                            {lista.contactos.length} contactos
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Resumen de Contactos Seleccionados */}
                  {formData.listasDestinatarios.length > 0 && (
                    <div className="mt-6 p-4 bg-sky-50 rounded-xl border border-sky-200">
                      <div className="flex items-center gap-2 text-sky-800 font-bold">
                        ✅ Total de contactos seleccionados:{" "}
                        {getTotalContactos()}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Información Adicional */}
              <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-6 border-2 border-blue-200 shadow-lg">
                <h3 className="font-bold text-blue-800 mb-4 text-lg flex items-center gap-2">
                  💡 Información Importante
                </h3>
                <ul className="text-blue-700 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>
                      Los correos se redactarán después de crear la campaña
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>
                      Puedes seleccionar múltiples listas de destinatarios
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>Las fechas son opcionales pero recomendadas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex justify-end gap-6 mt-12 pt-8 border-t-2 border-gray-200">
            <Link href="/campanas">
              <button
                type="button"
                className="px-10 py-4 border-2 border-gray-400 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-500 hover:shadow-lg transition-all duration-300 font-bold transform hover:scale-105"
              >
                Cancelar
              </button>
            </Link>
            <button
              type="submit"
              className="px-10 py-4 bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 hover:from-sky-500 hover:via-sky-600 hover:to-blue-600 text-white rounded-2xl transition-all duration-300 font-bold shadow-xl transform hover:scale-105 hover:shadow-2xl"
            >
              Crear Campaña ✨
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
