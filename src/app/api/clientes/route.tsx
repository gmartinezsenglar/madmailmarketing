import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

interface JwtPayload {
  empresaId: number;
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  let decoded: JwtPayload;
  try {
    decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }

  const empresaId = decoded.empresaId;
  if (!empresaId) {
    return NextResponse.json({ error: 'No autorizado: empresaId no encontrado' }, { status: 401 });
  }

  const listas = await prisma.listas_contactos.findMany({
    where: { empresa_id: empresaId },
    include: {
      listas_contactos_contactos: {
        include: {
          contactos: true,
        },
      },
    },
  });

  return NextResponse.json({ listas });
}
