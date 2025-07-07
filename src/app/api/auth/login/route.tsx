import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET!;


export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Campos incompletos' }, { status: 400 });
  }

  const empresa = await prisma.empresas.findFirst({ where: { email } });
  if (!empresa) {
    return NextResponse.json({ error: 'Empresa no encontrada' }, { status: 404 });
  }

  if (!empresa.contrase_a) {
    return NextResponse.json({ error: 'Contraseña no definida para esta empresa' }, { status: 500 });
  }

  const valid = await bcrypt.compare(password, empresa.contrase_a);
  if (!valid) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
  }

  const token = jwt.sign(
    {
      empresaId: empresa.id_empresa, // <-- agrega este campo
      email: empresa.email
    },
    SECRET,
    { expiresIn: '1d' }
  );

  const response = NextResponse.json({ mensaje: 'Inicio de sesión exitoso' });
  response.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: 'lax',
  });

  return response;
}
