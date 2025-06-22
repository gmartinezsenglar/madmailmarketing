"use client";

import Link from "next/link";
import { campañas } from "@/app/campanas";

export default function VerCampañas() {
  const getObjetivoIcon = (objetivo: string) => {
    switch (objetivo) {
      case "Aumentar ventas":
        return "💰";
      case "Generar leads":
        return "🎯";
      case "Fidelizar clientes":
        return "❤️";
      case "Anunciar eventos":
        return "📅";
      case "Difundir contenido":
        return "📢";
      default:
        return "📧";
    }
  };

  const getEstadoColor = (fechaFin: string) => {
    const hoy = new Date();
    const fechaFinDate = new Date(fechaFin);

    if (fechaFinDate > hoy) {
      return "bg-gradient-to-r from-green-500 to-green-600 text-white";
    } else {
      return "bg-gradient-to-r from-gray-500 to-gray-600 text-white";
    }
  };

  const calcularCorreosEnviados = (correos: any[]) => {
    return correos.filter((correo) => correo.estado === "Enviado").length;
  };

  const calcularTotalEntregados = (correos: any[]) => {
    return correos.reduce(
      (total, correo) => total + (correo.recibidos || 0),
      0
    );
  };

  return (
    <main className="text-black min-h-screen border-[16px] border-sky-400 bg-gradient-to-br from-white via-blue-50 to-sky-100 rounded-2xl shadow-2xl p-8 m-4">
      {/* Header Moderno */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent drop-shadow-lg">
            Gestión de Campañas
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Administra y monitorea tus campañas de email marketing
          </p>
        </div>
        <Link href="/campanas/crear">
          <button className="bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 hover:from-sky-500 hover:via-sky-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            ✨ Crear Nueva Campaña
          </button>
        </Link>
      </div>

      {/* Lista de Campañas Mejorada */}
      <div className="grid gap-8">
        {campañas.map((campaña) => (
          <div
            key={campaña.id}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-sky-200 hover:shadow-3xl hover:border-sky-300 transition-all duration-500 group"
          >
            {/* Header de la Campaña */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-3xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                    {campaña.nombre}
                  </h3>
                  <span className="text-2xl">
                    {getObjetivoIcon(campaña.objetivo)}
                  </span>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold ${getEstadoColor(
                      campaña.fechaFin
                    )}`}
                  >
                    {new Date(campaña.fechaFin) > new Date()
                      ? "Activa"
                      : "Finalizada"}
                  </span>
                </div>
                <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                  {campaña.descripcion}
                </p>

                {/* Información Básica */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
                    <div className="text-sm text-blue-600 font-semibold">
                      Objetivo
                    </div>
                    <div className="text-blue-800 font-bold">
                      {campaña.objetivo}
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-xl border border-green-200">
                    <div className="text-sm text-green-600 font-semibold">
                      Fecha Inicio
                    </div>
                    <div className="text-green-800 font-bold">
                      {campaña.fechaInicio}
                    </div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-xl border border-purple-200">
                    <div className="text-sm text-purple-600 font-semibold">
                      Fecha Fin
                    </div>
                    <div className="text-purple-800 font-bold">
                      {campaña.fechaFin}
                    </div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-xl border border-orange-200">
                    <div className="text-sm text-orange-600 font-semibold">
                      Creada
                    </div>
                    <div className="text-orange-800 font-bold">
                      {campaña.fechaCreacion}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 ml-6">
                <Link href={`/campanas/${campaña.id}`}>
                  <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl transition-all duration-300 font-bold shadow-lg transform hover:scale-105">
                    📊 Ver Detalles
                  </button>
                </Link>
              </div>
            </div>

            {/* Estadísticas Principales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-2xl text-center border-2 border-blue-200 shadow-md">
                <div className="text-3xl font-bold text-blue-600">
                  {calcularCorreosEnviados(campaña.correos)}
                </div>
                <div className="text-sm text-blue-800 font-semibold mt-1">
                  Correos Enviados
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-2xl text-center border-2 border-green-200 shadow-md">
                <div className="text-3xl font-bold text-green-600">
                  {calcularTotalEntregados(campaña.correos).toLocaleString()}
                </div>
                <div className="text-sm text-green-800 font-semibold mt-1">
                  Correos Entregados
                </div>
              </div>
              <div className="bg-gradient-to-br from-sky-50 to-sky-100 p-5 rounded-2xl text-center border-2 border-sky-200 shadow-md">
                <div className="text-3xl font-bold text-sky-600">
                  {campaña.correos.length}
                </div>
                <div className="text-sm text-sky-800 font-semibold mt-1">
                  Total de Correos
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-2xl text-center border-2 border-purple-200 shadow-md">
                <div className="text-3xl font-bold text-purple-600">
                  {campaña.totalDestinatarios.toLocaleString()}
                </div>
                <div className="text-sm text-purple-800 font-semibold mt-1">
                  Total Destinatarios
                </div>
              </div>
            </div>

            {/* Métricas Avanzadas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl text-center border border-emerald-200 shadow-sm">
                <div className="text-2xl font-bold text-emerald-600">
                  {campaña.tasaApertura}
                </div>
                <div className="text-xs text-emerald-800 font-semibold">
                  📖 Tasa de Apertura
                </div>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl text-center border border-indigo-200 shadow-sm">
                <div className="text-2xl font-bold text-indigo-600">
                  {campaña.tasaClics}
                </div>
                <div className="text-xs text-indigo-800 font-semibold">
                  👆 Tasa de Clics
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl text-center border border-red-200 shadow-sm">
                <div className="text-2xl font-bold text-red-600">
                  {campaña.tasaRebote}
                </div>
                <div className="text-xs text-red-800 font-semibold">
                  ⚠️ Tasa de Rebote
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl text-center border border-yellow-200 shadow-sm">
                <div className="text-2xl font-bold text-yellow-600">
                  {campaña.marcadosSpam}
                </div>
                <div className="text-xs text-yellow-800 font-semibold">
                  🚫 Marcados Spam
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje si no hay campañas */}
      {campañas.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-white/90 border-4 border-dashed border-gray-400 p-16 rounded-3xl shadow-inner backdrop-blur-md">
            <div className="text-6xl mb-6">📧</div>
            <h3 className="text-3xl font-bold text-gray-700 mb-6">
              No hay campañas creadas
            </h3>
            <p className="text-gray-600 mb-10 text-xl">
              Comienza creando tu primera campaña de email marketing
            </p>
            <Link href="/campanas/crear">
              <button className="bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 hover:from-sky-500 hover:via-sky-600 hover:to-blue-600 text-white font-bold py-5 px-10 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 text-lg">
                ✨ Crear Primera Campaña
              </button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
