'use client';

import Image from 'next/image';

export default function PerfilEmpresa() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-200 border-[20px] border-sky-400 rounded-2xl shadow-2xl px-4">
      <div className="w-full max-w-4xl bg-gray-800 text-white rounded-2xl p-8 shadow-2xl">
        
        <h1 className="text-4xl font-bold text-sky-300 mb-8 text-center">Perfil de Empresa</h1>

        {/* Información del perfil */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Logo */}
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/favicon.ico"
              alt="Logo Empresa"
              width={120}
              height={120}
              className="rounded-full border-4 border-sky-300"
            />
            <p className="text-sky-300 mt-4 font-semibold">MadMail Marketing Inc.</p>
          </div>

          {/* Datos */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sky-300">Dirección:</label>
              <p className="bg-gray-700 px-4 py-2 rounded-md mt-1">Av. Central 123, Ciudad Marketing</p>
            </div>
            <div>
              <label className="text-sky-300">Correo:</label>
              <p className="bg-gray-700 px-4 py-2 rounded-md mt-1">contacto@madmail.com</p>
            </div>
            <div>
              <label className="text-sky-300">Teléfono:</label>
              <p className="bg-gray-700 px-4 py-2 rounded-md mt-1">+56 9 1234 5678</p>
            </div>
          </div>

          {/* Descripción */}
          <div className="md:col-span-2">
            <label className="text-sky-300">Descripción:</label>
            <p className="bg-gray-700 px-4 py-3 rounded-md mt-1">
              Somos una empresa especializada en campañas de email marketing efectivas,
              ayudando a nuestros clientes a llegar a su público objetivo con herramientas automatizadas y personalizadas.
            </p>
          </div>
        </div>

        {/* Botón para editar */}
        <div className="mt-10 text-center">
          <button className="bg-sky-400 text-white font-semibold py-3 px-6 rounded-md hover:bg-sky-500 transition">
            Editar Perfil
          </button>
        </div>
      </div>
    </main>
  );
}
