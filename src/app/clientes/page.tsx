'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
type Lista = {
  id_lista: number;
  nombre: string | null;
};

export default function ListaClientes() {
  const [listas, setListas] = useState<Lista[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Inicializamos el hook useRouter

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
        <p className="text-blue-500 text-center mb-4">{error}</p>
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
    <div className="pt-16 px-6 text-black min-h-screen border-[16px] border-sky-400 bg-gradient-to-br from-white via-blue-50 to-sky-100 rounded-2xl shadow-2xl">
      <h1 className="text-2xl font-bold mb-4">Lista de Contactos</h1>
      {listas.length === 0 ? (
        <p className="text-gray-700">No hay listas de contactos en su empresa</p>
      ) : (
        <ul className="space-y-4">
          {listas.map(({ id_lista, nombre }) => (
            <li key={id_lista}>
              <Link href={`/clientes/${id_lista}`} className="block p-4 border rounded hover:bg-gray-300 transition">
                {nombre || `Lista #${id_lista}`}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 mb-4">
        <Link href="/clientes/crear_lista" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-fit">
          Añadir Nueva Lista
        </Link>
      </div>
    </div>
  );
}