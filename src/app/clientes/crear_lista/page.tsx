'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Link from "next/link";

// Define el tipo para un contacto para una mejor tipificación
type Contacto = {
  id_contacto: number;
  nombre: string;
  email: string;
};

export default function CrearLista() {
  const router = useRouter();

  // Estados del formulario
  const [nombreLista, setNombreLista] = useState('');
  const [contactosExistentes, setContactosExistentes] = useState<Contacto[]>([]);
  const [contactosSeleccionados, setContactosSeleccionados] = useState<number[]>([]);
  const [formularioNuevosContactos, setFormularioNuevosContactos] = useState([{ nombre: '', email: '' }]);

  useEffect(() => {
    async function fetchContactos() {
      try {
        const res = await fetch('/api/contactos', {
          method: 'GET',
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Error desconocido al cargar contactos.');
        }

        const data = await res.json();
        setContactosExistentes(data.contactos); 

      } catch (error: any) {
        console.error("Error al obtener contactos:", error);
        alert(`Error al cargar contactos: ${error.message}`); // Mensaje simple con alert
      }
    }

    fetchContactos();
  }, [router]); // `router` como dependencia para evitar advertencias de ESLint

  // --- Lógica para seleccionar/deseleccionar contactos existentes ---
  function toggleContacto(id: number) {
    setContactosSeleccionados(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(c => c !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  }

  // --- Lógica para actualizar campos de nuevos contactos ---
  function actualizarNuevoContacto(index: number, campo: 'nombre' | 'email', valor: string) {
    const nuevos = [...formularioNuevosContactos];
    nuevos[index][campo] = valor;
    setFormularioNuevosContactos(nuevos);
  }

  // --- Lógica para añadir un nuevo campo de contacto al formulario ---
  const agregarContacto = () => {
    setFormularioNuevosContactos(prevForms => [...prevForms, { nombre: '', email: '' }]);
  };

  // --- Manejador del envío del formulario ---
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Filtra los nuevos contactos para incluir solo aquellos con nombre y email
    const nuevosContactosFiltrados = formularioNuevosContactos.filter(
      c => c.nombre.trim() && c.email.trim()
    );

    // Validación básica antes de enviar
    if (!nombreLista.trim() && contactosSeleccionados.length === 0 && nuevosContactosFiltrados.length === 0) {
      alert('Debes ingresar un nombre para la lista o seleccionar/agregar al menos un contacto.');
      return;
    }

    try {
      // Envía la solicitud a la API de creación de lista
      const res = await fetch('/api/crear_lista', { // Asegúrate de que esta sea la ruta correcta
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // ¡Importante! Envía la cookie de autenticación
        body: JSON.stringify({
          nombreLista: nombreLista.trim(), // Limpia espacios en blanco
          contactosExistentesIds: contactosSeleccionados,
          nuevosContactos: nuevosContactosFiltrados,
          // ¡IMPORTANTE: empresaId ya NO se envía aquí! La API lo obtiene de la cookie.
        }),
      });

      const data = await res.json();
      
      // Manejo de errores de la API
      if (!res.ok) {
        if (res.status === 401) {
          alert(data.error || 'Sesión expirada. Por favor, inicia sesión de nuevo.');
          router.push('/'); // Redirige al inicio de sesión
        } else {
          alert(data.error || 'Error al crear la lista.'); // Muestra el mensaje de error de la API
        }
        return; 
      }

      // Éxito en la creación
      alert(data.message); 
      router.push('/clientes'); // Redirige a la lista de clientes
    } catch (error: any) {
      console.error('Error al enviar el formulario:', error);
      alert('Error de conexión: No se pudo crear la lista. Inténtalo de nuevo.'); // Error de red
    }
  }

  return (
    <div className="text-black min-h-screen border-[16px] border-sky-400 bg-gradient-to-br from-white via-blue-50 to-sky-100 rounded-2xl shadow-2xl pt-16 px-6">
      <div className="relative mb-8"> {/* Añadido mb-8 para espacio */}
        <Link href="/clientes" className="absolute top-0 right-0 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          ← Volver a Lista de Clientes
        </Link>
      </div>
      <h1 className="text-black text-2xl font-bold mb-4">Crear Lista de Contactos</h1>

      <form onSubmit={handleSubmit} className="flex flex-col">
        {/* Campo Nombre de Lista */}
        <div className="mb-6">
          <label className="block text-lg mb-2">Nombre de Lista</label>
          <input
            type="text"
            value={nombreLista}
            onChange={e => setNombreLista(e.target.value)}
            placeholder="Ingrese Nombre de Lista"
            // `required` en el HTML puede ser útil para validación inicial, pero la JS es más robusta
            className="w-full border-b-2 border-gray-400 focus:border-blue-600 focus:outline-none py-2"
          />
        </div>

        {/* Sección de Seleccionar Contactos Existentes */}
        <div className="mb-8">
          <label className="block text-lg mb-2">Seleccionar Contactos Existentes</label>
          <div className="space-y-2">
            {contactosExistentes.length === 0 ? (
              <p className="text-gray-500 italic"> ¡No hay Contactos Disponibles! <br /> Agregue un Contacto ↓</p>
            ) : (
              contactosExistentes.map(contacto => (
                <label key={contacto.id_contacto} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={contactosSeleccionados.includes(contacto.id_contacto)}
                    onChange={() => toggleContacto(contacto.id_contacto)}
                    className="form-checkbox h-5 w-5 text-sky-600 rounded" // Estilos Tailwind básicos
                  />
                  <span>
                    {contacto.nombre} - <span className="text-gray-500 text-sm">{contacto.email}</span>
                  </span>
                </label>
              ))
            )}
          </div>
        </div>

        {/* Sección de Agregar Nuevos Contactos */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Agregar Nuevos Contactos</h2>
          {formularioNuevosContactos.map((_, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                type="text"
                value={formularioNuevosContactos[index].nombre}
                onChange={e => actualizarNuevoContacto(index, 'nombre', e.target.value)}
                placeholder="Nombre"
                className="flex-1 border-b-2 border-gray-400 focus:border-blue-600 focus:outline-none py-2"
              />
              <input
                type="email"
                value={formularioNuevosContactos[index].email}
                onChange={e => actualizarNuevoContacto(index, 'email', e.target.value)}
                placeholder="Correo Electrónico"
                className="flex-1 border-b-2 border-gray-400 focus:border-blue-600 focus:outline-none py-2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={agregarContacto}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Agregar otro contacto
          </button>
        </div>

        {/* Botón de Enviar Formulario */}
        <button
          type="submit"
          className="bg-sky-500 mb-3 text-white px-6 py-3 rounded hover:bg-sky-600 w-fit font-semibold transition-colors duration-200"
        >
          Crear Lista
        </button>
      </form>
    </div>
  );
}