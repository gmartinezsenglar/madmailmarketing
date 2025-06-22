"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { campañas } from "@/app/campanas"

export default function DetalleCampañaYCorreos() {
  const params = useParams()
  const campaignId = params.id as string

  // Buscar la campaña específica
  const campaña = campañas.find((c) => c.id === campaignId)

  if (!campaña) {
    return (
      <main className="min-h-screen border-[16px] border-sky-400 bg-gradient-to-br from-white via-blue-50 to-sky-100 rounded-2xl shadow-2xl p-8 m-4">
        <div className="text-center py-16">
          <div className="text-6xl mb-6">❌</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Campaña no encontrada</h1>
          <Link href="/campanas">
            <button className="bg-sky-400 hover:bg-sky-500 text-white font-bold py-3 px-6 rounded-2xl transition">
              ← Volver a Campañas
            </button>
          </Link>
        </div>
      </main>
    )
  }

  const getObjetivoIcon = (objetivo: string) => {
    switch (objetivo) {
      case "Aumentar ventas":
        return "💰"
      case "Generar leads":
        return "🎯"
      case "Fidelizar clientes":
        return "❤️"
      case "Anunciar eventos":
        return "📅"
      case "Difundir contenido":
        return "📢"
      default:
        return "📧"
    }
  }

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

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "Enviado":
        return "✅"
      case "Programado":
        return "⏰"
      case "Borrador":
        return "📝"
      default:
        return "📧"
    }
  }

  const estadoCampaña = new Date(campaña.fechaFin) > new Date() ? "Activa" : "Completada"

  const calcularCorreosEnviados = () => {
    return campaña.correos.filter((correo) => correo.estado === "Enviado").length
  }

  const estadisticas = [
    {
      label: "Correos Enviados",
      valor: calcularCorreosEnviados(),
      total: campaña.correos.length,
      color: "blue",
      icon: "📧",
    },
    {
      label: "Destinatarios",
      valor: campaña.totalDestinatarios.toLocaleString(),
      color: "sky",
      icon: "👥",
    },
    {
      label: "Tasa de Apertura",
      valor: campaña.tasaApertura,
      color: "green",
      icon: "📖",
    },
    {
      label: "Tasa de Clics",
      valor: campaña.tasaClics,
      color: "purple",
      icon: "👆",
    },
    {
      label: "Tasa de Rebote",
      valor: campaña.tasaRebote,
      color: "red",
      icon: "⚠️",
    },
    {
      label: "Marcados Spam",
      valor: campaña.marcadosSpam,
      color: "yellow",
      icon: "🚫",
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 border-blue-200",
      sky: "bg-gradient-to-br from-sky-50 to-sky-100 text-sky-700 border-sky-200",
      green: "bg-gradient-to-br from-green-50 to-green-100 text-green-700 border-green-200",
      purple: "bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 border-purple-200",
      red: "bg-gradient-to-br from-red-50 to-red-100 text-red-700 border-red-200",
      yellow: "bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-700 border-yellow-200",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <main className="min-h-screen border-[16px] border-sky-400 bg-gradient-to-br from-white via-blue-50 to-sky-100 rounded-2xl shadow-2xl p-8 m-4">
      {/* Header Mejorado */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent drop-shadow-lg">
              {campaña.nombre}
            </h1>
            <span className="text-3xl">{getObjetivoIcon(campaña.objetivo)}</span>
          </div>
          <div className="flex items-center gap-4">
            <span
              className={`${getEstadoColor(estadoCampaña)} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}
            >
              {estadoCampaña}
            </span>
            <span className="text-gray-600 font-medium">ID: {campaignId}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/campanas">
            <button className="bg-white/90 backdrop-blur-sm text-blue-700 font-bold py-3 px-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border-2 border-blue-200 transform hover:scale-105">
              ← Volver a Campañas
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Información Principal */}
        <div className="lg:col-span-2 space-y-8">
          {/* Detalles de la Campaña */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-sky-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              📋 Información de la Campaña
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <label className="text-sm font-bold text-blue-600 uppercase tracking-wide">Descripción:</label>
                  <p className="text-gray-800 mt-2 leading-relaxed">{campaña.descripcion}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <label className="text-sm font-bold text-green-600 uppercase tracking-wide">Objetivo:</label>
                  <p className="text-gray-800 mt-2 font-semibold">{campaña.objetivo}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <label className="text-sm font-bold text-purple-600 uppercase tracking-wide">Fecha de Inicio:</label>
                  <p className="text-gray-800 mt-2 font-semibold">{campaña.fechaInicio}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                  <label className="text-sm font-bold text-orange-600 uppercase tracking-wide">
                    Fecha de Creación:
                  </label>
                  <p className="text-gray-800 mt-2 font-semibold">{campaña.fechaCreacion}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                  <label className="text-sm font-bold text-red-600 uppercase tracking-wide">Fecha de Fin:</label>
                  <p className="text-gray-800 mt-2 font-semibold">{campaña.fechaFin}</p>
                </div>
                <div className="bg-sky-50 p-4 rounded-xl border border-sky-200">
                  <label className="text-sm font-bold text-sky-600 uppercase tracking-wide">Total Destinatarios:</label>
                  <p className="text-gray-800 mt-2 font-semibold">{campaña.totalDestinatarios.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Correos */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-sky-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">📧 Correos de la Campaña</h2>

            {/* Resumen de Correos */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-center">
                <div className="text-2xl font-bold text-blue-600">{campaña.correos.length}</div>
                <div className="text-sm text-blue-800 font-semibold">Total Correos</div>
              </div>
              <div className="bg-green-50 p-4 rounded-xl border border-green-200 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {campaña.correos.filter((c) => c.estado === "Enviado").length}
                </div>
                <div className="text-sm text-green-800 font-semibold">Enviados</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {campaña.correos.filter((c) => c.estado === "Programado").length}
                </div>
                <div className="text-sm text-yellow-800 font-semibold">Programados</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {campaña.correos.filter((c) => c.estado === "Borrador").length}
                </div>
                <div className="text-sm text-gray-800 font-semibold">Borradores</div>
              </div>
            </div>

            {/* Lista de Correos */}
            <div className="space-y-6">
              {campaña.correos.map((correo) => (
                <Link key={correo.id} href={`/campanas/${campaignId}/${correo.id}`}>
                  <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                            {correo.asunto}
                          </h3>
                          <span className="text-xl">{getEstadoIcon(correo.estado)}</span>
                          <span
                            className={`${getEstadoColor(correo.estado)} text-white px-3 py-1 rounded-full font-bold text-xs shadow-md`}
                          >
                            {correo.estado}
                          </span>
                        </div>

                        <p className="text-gray-600 mb-4 leading-relaxed text-sm">{correo.contenido}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="bg-blue-50 p-2 rounded-lg border border-blue-200">
                            <div className="text-xs text-blue-600 font-semibold">Fecha de Envío</div>
                            <div className="text-blue-800 font-bold text-sm">📅 {correo.fechaEnvio}</div>
                          </div>
                          <div className="bg-green-50 p-2 rounded-lg border border-green-200">
                            <div className="text-xs text-green-600 font-semibold">Enviados</div>
                            <div className="text-green-800 font-bold text-sm">
                              📧 {correo.enviados.toLocaleString()}
                            </div>
                          </div>
                          <div className="bg-purple-50 p-2 rounded-lg border border-purple-200">
                            <div className="text-xs text-purple-600 font-semibold">Recibidos</div>
                            <div className="text-purple-800 font-bold text-sm">
                              ✅ {correo.recibidos.toLocaleString()}
                            </div>
                          </div>
                          <div className="bg-orange-50 p-2 rounded-lg border border-orange-200">
                            <div className="text-xs text-orange-600 font-semibold">Tasa Entrega</div>
                            <div className="text-orange-800 font-bold text-sm">
                              📊 {correo.enviados > 0 ? ((correo.recibidos / correo.enviados) * 100).toFixed(1) : 0}%
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-sky-400 text-2xl group-hover:text-sky-600 transition-colors transform group-hover:translate-x-1 ml-4">
                        →
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mensaje si no hay correos */}
            {campaña.correos.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-gray-50 border-4 border-dashed border-gray-300 p-12 rounded-2xl">
                  <div className="text-4xl mb-4">📧</div>
                  <h3 className="text-xl font-bold text-gray-700 mb-4">No hay correos en esta campaña</h3>
                  <p className="text-gray-600 mb-6">
                    Los correos de esta campaña aparecerán aquí una vez que los crees
                  </p>
                  <Link href="/redactar_correo">
                    <button className="bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
                      ✨ Redactar Primer Correo
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Acciones Rápidas */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-sky-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">⚡ Acciones Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/redactar_correo">
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl transform hover:scale-105 flex items-center justify-center gap-3">
                  📧 Redactar Nuevo Correo
                </button>
              </Link>
              <Link href="/clientes">
                <button className="w-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl transform hover:scale-105 flex items-center justify-center gap-3">
                  👥 Gestionar Destinatarios
                </button>
              </Link>
              <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl transform hover:scale-105 flex items-center justify-center gap-3">
                📊 Generar Reporte
              </button>
              <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl transform hover:scale-105 flex items-center justify-center gap-3">
                ⚙️ Configurar Campaña
              </button>
            </div>
          </div>
        </div>

        {/* Panel de Estadísticas */}
        <div className="space-y-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-sky-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">📊 Estadísticas</h2>
            <div className="space-y-4">
              {estadisticas.map((stat, index) => (
                <div key={index} className={`p-5 rounded-2xl border-2 shadow-lg ${getColorClasses(stat.color)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{stat.icon}</span>
                    <div className="text-3xl font-bold">{stat.total ? `${stat.valor}/${stat.total}` : stat.valor}</div>
                  </div>
                  <div className="text-sm font-bold uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Progreso de la Campaña */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-sky-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">📈 Progreso de Campaña</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-3 font-semibold">
                  <span className="text-gray-700">Correos Enviados</span>
                  <span className="text-blue-600">
                    {calcularCorreosEnviados()}/{campaña.correos.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full shadow-sm transition-all duration-500"
                    style={{ width: `${(calcularCorreosEnviados() / campaña.correos.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-3 font-semibold">
                  <span className="text-gray-700">Tasa de Apertura</span>
                  <span className="text-green-600">{campaña.tasaApertura}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full shadow-sm transition-all duration-500"
                    style={{ width: campaña.tasaApertura }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-3 font-semibold">
                  <span className="text-gray-700">Tasa de Clics</span>
                  <span className="text-purple-600">{campaña.tasaClics}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full shadow-sm transition-all duration-500"
                    style={{ width: campaña.tasaClics }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
