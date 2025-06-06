'use client';

export default function RedactarCorreo() {

  return (
    <div className="flex flex-col min-h-screen text-black px-6 py-8">
      <h1 className="text-center text-4xl font-bold mb-12 text-blue-950">
        Redactar Nuevo Correo
      </h1>
      <form className="flex flex-col">
        <div className="mb-6">
            <label className="block text-lg mb-2">
                Campaña
            </label>
            <select  defaultValue="" className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700">
              <option value="" disabled >Selecciona una campaña</option>
              <option>Invierno 2025 - 20% Descuento</option>
              <option>Anuncio Nuevos Productos</option>
            </select>
        </div>
        <div className="mb-6">
            <label className="block text-lg mb-2">
                Lista de Contactos
            </label>
            <select  defaultValue="" className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700">
              <option value="" disabled >Selecciona una lista de contactos</option>
              <option>Clientes Potenciales 2025</option>
              <option>Inscritos Curso Marketing Digital</option>
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
