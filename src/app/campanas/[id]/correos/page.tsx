"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

export default function ListaCorreosCampana() {
  const params = useParams()
  const campaignId = params.id

  const correos = [
    {
      id: 1,
      asunto: "¡Descuentos de Verano hasta 50% OFF!",
      fechaEnvio: "2024-01-20",
      estado: "Enviado",
    },
    {
      id: 2,
      asunto: "Últimos días - Ofertas de Verano",
      fechaEnvio: "2024-01-25",
      estado: "Enviado",
    },
    {
      id: 3,
      asunto: "Recordatorio: Ofertas terminan mañana",
      fechaEnvio: "2024-02-01",
      estado: "Programado",
    },
  ]

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Enviado":
        return "bg-gradient-to-r from-green-500 to-green-600"
      case "Programado":
        return "bg-gradient-to-r from-yellow-500 to-yellow-600"
      case "Borrador":
        return "bg-gradient-to-r from-gray-500 to-gray-600"
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500"
    }
  }

  return (
    <main className="min-h-screen border-[16px] border-sky-400 bg-gradient-to-br from-white via-blue-50 to-sky-100 rounded-2xl shadow-2xl p-8 m-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 drop-shadow-md mb-2">Lista de Correos</h1>
          <p className="text-gray-600 font-medium text-lg">Campaña ID: {campaignId}</p>
        </div>
        <Link href="/campanas">
          <button className="bg-white text-blue-700 font-bold py-3 px-5 rounded-full hover:bg-blue-50 transition-all duration-200 shadow-lg border-2 border-blue-200">
            ← Volver a Campañas
          </button>
        </Link>
      </div>

      {/* Lista de Correos */}
      <div className="space-y-6">
        {correos.map((correo) => (
          <Link key={correo.id} href={`/correos/${correo.id}`}>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-sky-200 hover:shadow-2xl hover:border-sky-300 transition-all duration-300 cursor-pointer hover:bg-white group">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors">
                    {correo.asunto}
                  </h3>
                  <div className="flex items-center gap-4">
                    <span
                      className={`${getEstadoColor(correo.estado)} text-white px-4 py-2 rounded-full font-bold text-sm shadow-md`}
                    >
                      {correo.estado}
                    </span>
                    <span className="text-gray-600 font-medium flex items-center gap-1">📅 {correo.fechaEnvio}</span>
                  </div>
                </div>
                <div className="text-sky-400 text-3xl group-hover:text-sky-600 transition-colors transform group-hover:translate-x-1">
                  →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mensaje si no hay correos */}
      {correos.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-white/90 border-4 border-dashed border-gray-400 p-12 rounded-3xl shadow-inner backdrop-blur-md">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">No hay correos en esta campaña</h3>
            <p className="text-gray-600 mb-6 text-lg">Los correos de esta campaña aparecerán aquí</p>
          </div>
        </div>
      )}
    </main>
  )
}
