import { NextResponse } from 'next/server';

/**
 * POST /api/auth/logout
 * Borra la cookie del token para cerrar sesión
 */
export async function POST() {
  const response = NextResponse.json({ mensaje: 'Sesión cerrada correctamente' });
  response.cookies.set('token', '', { expires: new Date(0), path: '/' });
  return response;
}