'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function LoginRegistro() {
  const [modo, setModo] = useState<'login' | 'registro'>('login');

  // Campos comunes
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Solo para registro
  const [nombre, setNombre] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    alert(data.mensaje || data.error);
  };

  const handleRegister = async () => {
    if (password !== passwordConfirm) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password }),
    });

    const data = await res.json();
    alert(data.mensaje || data.error);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-200 border-[20px] border-sky-400 rounded-2xl shadow-2xl px-4">
      <div className="relative w-full max-w-5xl h-[600px] bg-gray-800 text-white overflow-hidden rounded-2xl shadow-2xl">
        
        {/* Formulario de login */}
        {modo === 'login' && (
          <div className="absolute top-0 left-0 w-1/2 h-full p-10 flex flex-col justify-center gap-5 z-10">
            <h2 className="text-3xl font-bold text-sky-300 mb-2">Iniciar Sesión</h2>
            <input type="email" placeholder="Correo electrónico"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 placeholder-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400" />
            <input type="password" placeholder="Contraseña"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 placeholder-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400" />
            <button onClick={handleLogin} className="bg-sky-400 text-white font-semibold py-3 rounded-md hover:bg-sky-500 transition">
              Ingresar
            </button>
          </div>
        )}

        {/* Formulario de registro */}
        {modo === 'registro' && (
          <div className="absolute top-0 right-0 w-1/2 h-full p-10 flex flex-col justify-center gap-4 z-10">
            <h2 className="text-3xl font-bold text-sky-300 mb-2">Registro de Usuario</h2>
            <input type="text" placeholder="Nombre completo"
              value={nombre} onChange={(e) => setNombre(e.target.value)}
              className="bg-gray-700 placeholder-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400" />
            <input type="email" placeholder="Correo electrónico"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 placeholder-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400" />
            <input type="password" placeholder="Contraseña"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 placeholder-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400" />
            <input type="password" placeholder="Confirmar contraseña"
              value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}
              className="bg-gray-700 placeholder-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400" />
            <button onClick={handleRegister} className="bg-sky-400 text-white font-semibold py-3 rounded-md hover:bg-sky-500 transition">
              Crear cuenta
            </button>
          </div>
        )}

        {/* Panel decorativo */}
        <div
          className={`absolute top-0 w-1/2 h-full bg-gray-300 text-black flex flex-col justify-center items-center transition-all duration-700 ease-in-out rounded-2xl z-20 ${
            modo === 'login' ? 'left-0' : 'left-1/2'
          }`}
        >
          <Image
            src="/favicon.ico"
            alt="decoración"
            width={80}
            height={80}
            className="mb-4"
          />
          <p className="text-xl font-semibold text-center px-6">
            {modo === 'login' ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
          </p>
        </div>

        {/* Botón deslizante */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30">
          <button
            onClick={() => setModo(modo === 'login' ? 'registro' : 'login')}
            className="w-20 h-10 bg-gray-600 rounded-full flex items-center px-1 transition-all duration-300"
          >
            <div
              className={`w-8 h-8 bg-white text-black font-bold rounded-full flex items-center justify-center transition-transform duration-300 ${
                modo === 'login' ? 'translate-x-0' : 'translate-x-10'
              }`}
            />
          </button>
        </div>
      </div>
    </main>
  );
}