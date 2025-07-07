'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedactarCorreo() {
  const [listas, setListas] = useState<{ id_lista: number; nombre: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchListas() {
      setError(null); 

      try {
        const res = await fetch('/api/clientes', {
          method: 'GET',
          credentials: 'include', 
        });

        if (res.status === 401) {
          setError('No hay una sesion activa');
          return; 
        }

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Error desconocido al cargar las listas.');
        }

        const data = await res.json();
        setListas(data.listas);

      } catch (err: any) {
        console.error("Error al obtener listas:", err);
        setError(err.message || 'Error de conexión.');
      }
    }

    fetchListas();
  }, [router]); 

  if (error) {
    return (
      <div className="pt-16 px-6 text-black min-h-screen flex flex-col items-center justify-center border-[16px] border-sky-400 bg-gradient-to-br from-white via-blue-50 to-sky-100 rounded-2xl shadow-2xl">
        <p className="text-blue-500 text-center mb-4"> {error}</p>
        <button
          onClick={() => router.push('/login')}
          className="bg-sky-400 text-white px-4 py-2 rounded hover:bg-sky-500 transition"
        >
          Iniciar Sesion / Registrarse
        </button>
      </div>
    );
  }

  return (
    <div className="text-black min-h-screen border-[16px] border-sky-400 bg-gradient-to-br from-white via-blue-50 to-sky-100 rounded-2xl shadow-2xl pt-16 px-6">
      <h1 className="text-2xl font-bold mb-4">Redactar Nuevo Correo</h1>
      <form className="flex flex-col">
        <div className="mb-6">
          <label className="block text-lg mb-2">Campaña</label>
          <select required defaultValue="" className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700">
            <option value="" disabled>Selecciona una campaña</option>
            <option>Invierno 2025 - 20% Descuento</option>
            <option>Anuncio Nuevos Productos</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-lg mb-2">Lista de Contactos</label>
          <select required defaultValue="" className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700">
            <option value="" disabled>Selecciona una lista de contactos</option>
            {listas.map((lista) => (
              <option key={lista.id_lista} value={lista.id_lista}>
                {lista.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-lg mb-2">Programar envío (opcional)</label>
          <input
            type="datetime-local"
            className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg mb-2">Asunto:</label>
          <input
            type="text"
            placeholder="Ingrese Asunto"
            required
            className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg mb-2">Mensaje:</label>
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
