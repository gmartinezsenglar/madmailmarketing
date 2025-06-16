'use client';

import { listaContactos } from "@/app/clientes_simulado";
import { useState } from "react";
import Link from "next/link";

export default function CrearLista() {
  const [formularioNuevosContactos, setFormularioNuevosContactos] = useState([{ nombre: '', correo: '' }]);
  const todosLosContactos = listaContactos.flatMap(lista => lista.contactos);

  const agregarContacto = () => {
    setFormularioNuevosContactos([...formularioNuevosContactos, { nombre: '', correo: '' }]);
  };
  
  const mapContactos = new Map();
  for (const contacto of todosLosContactos) {
    mapContactos.set(contacto.id, contacto);
  }

  const contactosUnicos = Array.from(mapContactos.values());

  return (
    <div className="text-black min-h-screen border-[16px] border-sky-400 bg-gradient-to-br from-white via-blue-50 to-sky-100 rounded-2xl shadow-2xl pt-16 px-6">
      <div className="relative">
        <Link href="/clientes">
          <button className="absolute top-0 right-0 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          ← Volver a Lista de Clientes
          </button>
        </Link>
      </div>
      <h1 className="text-black text-2xl font-bold mb-4">
        Crear Lista de Contactos
      </h1>
      <form className="flex flex-col">
        <div className="mb-6">
          <label className="block text-lg mb-2">Nombre de Lista</label>
          <input
            type="text"
            placeholder="Ingrese Nombre de Lista"
            required
            className="w-full border-b-2 border-gray-400 focus:border-blue-600 focus:outline-none py-2"
          />
        </div>   
        <div className="mb-8">
          <label className="block text-lg mb-2">Seleccionar Contactos</label>
          <div>
            {contactosUnicos.map(contacto => (
              <label key={contacto.id} className="flex items-center space-x-3">
                <input type="checkbox" className="form-checkbox" />
                <span>
                  {contacto.nombre}  {"- "}
                  <span className="text-gray-500 text-sm">{contacto.correo}</span>
                </span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-4">Agregar Nuevos Contactos</h2>
          {formularioNuevosContactos.map((_, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                type="text"
                placeholder="Nombre"
                className="flex-1 border-b-2 border-gray-500 focus:border-blue-600 focus:outline-none py-2"
              />
              <input
                type="email"
                placeholder="Correo"
                className="flex-1 border-b-2 border-gray-500 focus:border-blue-600 focus:outline-none py-2"
              />
            </div>
          ))}
          <button
            type = "button"
            onClick={agregarContacto}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Agregar otro contacto
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-fit mx-4">
            Crear Lista
          </button>
        </div>
      </form>
    </div>
  );
}
