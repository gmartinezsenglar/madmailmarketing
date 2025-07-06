import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

/**
 * POST /api/auth/register
 * Espera: { nombre: string, email: string, password: string }
 * Devuelve: mensaje de éxito o error
 */
export async function POST(req: Request) {
  const { nombre, email, password } = await req.json();

  if (!nombre || !email || !password) {
    return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
  }

  // Aquí el compañero debe verificar si ya existe un usuario con ese email:
  // const existente = await prisma.empresas.findUnique({ where: { email } });
  // if (existente) return NextResponse.json({ error: 'Correo ya registrado' }, { status: 409 });

  const hashedPassword = await bcrypt.hash(password, 10);

  // Aquí el compañero debe guardar el nuevo registro:
  // const nuevaEmpresa = await prisma.empresas.create({
  //   data: { nombre, email, contraseña: hashedPassword },
  // });

  return NextResponse.json({ mensaje: 'Registro exitoso (simulado)', contraseñaHasheada: hashedPassword });
}