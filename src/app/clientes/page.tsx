'use client';

import Link from 'next/link';
import { listaContactos } from "@/app/clientes_simulado"
export default function ListaClientes() {
  return (
    <div className="flex flex-col min-h-screen text-black px-6 py-8">
      <h1 className="text-2xl font-bold mb-4">Lista de Contactos</h1>      
      <ul className="space-y-4">
        {listaContactos.map((lista) => (
          <li key={lista.id}>
            <Link href={`/clientes/${lista.id}`} className="block p-4 border rounded hover:bg-gray-100 transition">
              {lista.nombre}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Link href="/clientes/crear_lista" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-fit mb-4">
          Añadir Nueva Lista
        </Link>
      </div>
    </div>
  );
}
