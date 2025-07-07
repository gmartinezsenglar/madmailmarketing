import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { nombre, email, password } = await req.json();

  if (!nombre || !email || !password) {
    return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
  }

  const existente = await prisma.empresas.findFirst({ where: { email } });
  if (existente) return NextResponse.json({ error: 'Correo ya registrado' }, { status: 409 });

  const hashedPassword = await bcrypt.hash(password, 10);

  const nuevaEmpresa = await prisma.empresas.create({
     data: { nombre, email, contrase_a: hashedPassword },
  });

  return NextResponse.json({ mensaje: 'Registro exitoso, Inicie sesion deslizando hacia la derecha' });
}