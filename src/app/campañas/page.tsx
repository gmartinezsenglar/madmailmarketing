'use client'

import Link from "next/link"
import { campañas } from "@/app/campanas" 

export default function VerCampanas() {

  return (
    <main className="min-h-screen border-[16px] border-sky-400 bg-gradient-to-br from-white via-blue-50 to-sky-100 rounded-2xl shadow-2xl p-8 m-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 drop-shadow-md">Campañas Creadas</h1>
        <Link href="/campanas/crear_campana">
          <button className="bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105">
            + Crear Campaña
          </button>
        </Link>
      </div>

      <div className="grid gap-6">
        {campañas.map((campana) => {
          const correosEnviados = campana.correos.filter(c => c.estado === "Enviado").length
          const correosEntregados = campana.correos.reduce((acc, c) => acc + c.recibidos, 0)
          const totalCorreos = campana.correos.length

          return (
            <div
              key={campana.id}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-sky-200 hover:shadow-2xl hover:border-sky-300 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{campana.nombre}</h3>
                  <p className="text-gray-600 font-medium">ID: {campana.id}</p>
                </div>
                <div className="flex gap-3">
                  <Link href={`/campanas/${campana.id}`}>
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-3 rounded-lg transition-all duration-200 font-bold shadow-lg transform hover:scale-105">
                      Ver Lista de Correos
                    </button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl text-center border-2 border-blue-200 shadow-md">
                  <div className="text-3xl font-bold text-blue-600">{correosEnviados}</div>
                  <div className="text-sm text-blue-800 font-semibold mt-1">Correos Enviados</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl text-center border-2 border-green-200 shadow-md">
                  <div className="text-3xl font-bold text-green-600">{correosEntregados.toLocaleString()}</div>
                  <div className="text-sm text-green-800 font-semibold mt-1">Correos Recibidos</div>
                </div>
                <div className="bg-gradient-to-br from-sky-50 to-sky-100 p-5 rounded-xl text-center border-2 border-sky-200 shadow-md">
                  <div className="text-3xl font-bold text-sky-600">{totalCorreos}</div>
                  <div className="text-sm text-sky-800 font-semibold mt-1">Total de Correos</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {campañas.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-white/90 border-4 border-dashed border-gray-400 p-12 rounded-3xl shadow-inner backdrop-blur-md">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">No hay campañas creadas</h3>
            <p className="text-gray-600 mb-8 text-lg">Comienza creando tu primera campaña de email marketing</p>
            <Link href="/campanas/crear_campana">
              <button className="bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105">
                Crear Primera Campaña
              </button>
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
