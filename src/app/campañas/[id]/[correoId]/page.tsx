'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

import { campañas } from '@/app/campanas'

export default function DetalleCorreo() {
  const { id: campaignId, correoId } = useParams() as { id: string; correoId: string }


  const campaña = campañas.find(c => c.id === campaignId)
  const correo = campaña?.correos.find(c => c.id === correoId)

  if (!correo) {
    return <div className="p-8 text-red-600 font-bold">Correo no encontrado</div>
  }

  return (
    <div className="px-8 py-4 text-gray-800 w-full min-h-screen bg-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detalle de Correo</h1>
        <div className="flex gap-4 bg-white p-3 rounded-lg shadow">
          <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
            Reenviar Correo
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
            Eliminar Correo del Historial
          </button>
          <Link href={`/campanas/${campaignId}`}>
            <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
              Volver a la lista de correos
            </button>
          </Link>
          <Link href={`/campanas/${campaignId}`}>
            <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
              Editar Correo
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow space-y-6">
        <section>
          <h2 className="text-xl font-semibold">Asunto:</h2>
          <p className="text-lg">{correo.asunto}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Contenido:</h2>
          <p>{correo.contenido}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Destinatarios:</h2>
          <p>{correo.destinatarios}</p>

          <h2 className="text-xl font-semibold mt-4">Fecha:</h2>
          <p>{correo.fecha}</p>

          <h2 className="text-xl font-semibold mt-4">Estado:</h2>
          <p>{correo.estado}</p>
        </section>
        <div className="flex justify-between border-t pt-4 text-gray-600">
          <p>Recibidos: {correo.recibidos}</p>
          <p>Enviados: {correo.enviados}</p>
        </div>
      </div>
    </div>
  )
}
