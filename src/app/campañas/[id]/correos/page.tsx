'use client';

import Link from 'next/link';

export default function DetalleCorreo() {
  return (
    <div className="px-8 py-4 text-gray-800 w-full min-h-screen bg-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detalle de Correo</h1>
        <div className="flex gap-4 bg-white p-3 rounded-lg shadow">
          <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
            Reenviar Correo
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
            Eliminar Correo del Historial
          </button>
          <Link href="#">
            <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
              Volver a la lista de correos
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow space-y-6">
        <section>
          <h2 className="text-xl font-semibold">Asunto:</h2>
          <p className="text-lg">Lorem Ipsum </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Contenido:</h2>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut mi sed arcu laoreet gravida. 
          Fusce semper elementum massa, sollicitudin elementum orci fringilla a.
          Vivamus ac lectus at mi tempor tincidunt sed sit amet sem. Pellentesque sed ornare lectus, at malesuada est.
          Suspendisse ac rhoncus arcu. Donec consequat lacus id odio blandit convallis.
          Aenean molestie ante rhoncus lacus maximus commodo. Mauris auctor ante lectus, quis dictum augue aliquam a. 
          Proin condimentum auctor sagittis. Sed fermentum at felis a consequat.
          Duis facilisis magna eu turpis volutpat commodo. Etiam posuere, leo sed lacinia scelerisque, ex sem rhoncus dui,
          eu aliquet nulla diam ut nibh. Integer congue non sem id varius. Praesent tincidunt erat ut nisi molestie, 
          ut blandit massa pretium. Fusce quis ex nec tortor imperdiet varius eget nec mauris. Aenean quis est lectus.
          Nulla bibendum eleifend enim. Curabitur in lacus sed sem pharetra imperdiet. Aenean bibendum pretium faucibus. 
          Duis interdum tortor ac vulputate molestie. Suspendisse feugiat nulla aliquet nulla tincidunt euismod. 
          Nunc suscipit sodales nisl, sed sagittis est dapibus eu. Maecenas sed dui ut dui imperdiet lobortis nec ut orci.
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Destinatarios:</h2>
          <p>Lista Premium</p>
          <h2 className="text-xl font-semibold">Fecha:</h2>
          <p>19-02-1999</p>
          <h2 className="text-xl font-semibold">Campaña:</h2>
          <h2>Invierno 2025 - 20% Descuento</h2>
        </section>
        <div className="flex flex-wrap justify-between items-center border-t pt-4 text-gray-600">
          <div><h2>Recibidos: 50</h2></div>
          <div><h2>Enviados: 40</h2></div>
        </div>
      </div>
    </div>
  );
}
