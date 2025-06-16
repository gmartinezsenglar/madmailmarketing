import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen border-[16px] border-sky-400 bg-gradient-to-br from-white via-blue-50 to-sky-100 rounded-2xl shadow-2xl flex flex-col items-center pt-16 px-6">
      {/* Título */}
      <h1 className="text-5xl font-bold text-gray-800 text-center mb-12 drop-shadow-md">
        MadMail Marketing Inc.
      </h1>

      {/* Barra de navegación */}
      <div className="w-full max-w-4xl bg-blue-600 rounded-full shadow-lg p-4 flex justify-center gap-6 mb-16">
        <Link href="/">
          <button className="px-6 py-2 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-100 transition shadow-sm">
            Inicio
          </button>
        </Link>
        <Link href="/campanas">
          <button className="px-6 py-2 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-100 transition shadow-sm">
            Campañas
          </button>
        </Link>
        <Link href="/clientes">
          <button className="px-6 py-2 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-100 transition shadow-sm">
            Clientes
          </button>
        </Link>
        <Link href="/login">
          <button className="px-6 py-2 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-100 transition shadow-sm">
            Login
          </button>
        </Link>
        <Link href="/perfil">
          <button className="px-6 py-2 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-100 transition shadow-sm">
            Perfil de Empresa
          </button>
        </Link>
        <Link href="/redactar_correo">
          <button className="px-6 py-2 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-100 transition shadow-sm">
            Redactar Correo
          </button>
        </Link>
      </div>

      {/* Espacio reservado */}
      <section className="w-full max-w-4xl bg-white/80 border-4 border-dashed border-gray-300 p-12 text-center text-gray-500 rounded-3xl shadow-inner backdrop-blur-md">
        Aquí se mostrará información, imágenes u otros elementos en el futuro.
      </section>
    </main>
  );
}
