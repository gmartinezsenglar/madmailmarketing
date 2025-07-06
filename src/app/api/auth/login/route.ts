import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secreto-provisional';

/**
 * POST /api/auth/login
 * Espera: { email: string, password: string }
 * Devuelve: token en cookie si es exitoso
 */
export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Campos incompletos' }, { status: 400 });
  }

  // Buscar empresa por correo
  // const empresa = await prisma.empresas.findUnique({ where: { email } });
  // if (!empresa) return NextResponse.json({ error: 'Empresa no encontrada' }, { status: 404 });

  // Validar contraseña
  // const valid = await bcrypt.compare(password, empresa.contraseña);
  const valid = true; // Simulación

  if (!valid) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
  }

  // Crear token con el ID (cuando esté conectado)
  const token = jwt.sign({ email }, SECRET, { expiresIn: '1d' });

  const response = NextResponse.json({ mensaje: 'Inicio de sesión exitoso (simulado)' });
  response.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 día
  });

  return response;
}