'use client';

import { listaContactos } from "@/app/clientes_simulado"

export default function RedactarCorreo() {

  return (
    <div className="text-black min-h-screen border-[16px] border-sky-400 bg-gradient-to-br from-white via-blue-50 to-sky-100 rounded-2xl shadow-2xl pt-16 px-6">
      <h1 className="text-2xl font-bold mb-4">
        Redactar Nuevo Correo
      </h1>
      <form className="flex flex-col">
        <div className="mb-6">
            <label className="block text-lg mb-2">
                Campaña
            </label>
            <select  required defaultValue="" className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700">
              <option value="" disabled >Selecciona una campaña</option>
              <option>Invierno 2025 - 20% Descuento</option>
              <option>Anuncio Nuevos Productos</option>
            </select>
        </div>
        <div className="mb-6">
            <label className="block text-lg mb-2">
                Lista de Contactos
            </label>
            <select required defaultValue="" className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700">
              <option value="" disabled >Selecciona una lista de contactos</option>
            {listaContactos.map((lista) => (
              <option key={lista.id}>{lista.nombre}</option>         
            ))}
            </select>     
        </div>
        <div className="mb-6">
          <label className="block text-lg mb-2">
            Asunto:
          </label>
          <input
            type="text"
            placeholder="Ingrese Asunto"
            required
            className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg mb-2">
            Mensaje:
          </label>
          <textarea
              required
              placeholder="Escribe aquí tu mensaje..."
              className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 min-h-[190px]"
            />
        </div>
        <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-fit mb-4">
          Enviar Correo
        </button>
      </form>
    </div>
  );
}
