import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const pathSegments = request.nextUrl.pathname.split('/');
  const id = pathSegments[pathSegments.indexOf('clientes') + 1];

  if (!id) {
    return NextResponse.json({ error: 'ID de lista inválido' }, { status: 400 });
  }

  const id_lista = parseInt(id);
  const { nombre, email } = await request.json();

  if (!nombre || !email) {
    return NextResponse.json({ error: 'Faltan campos nombre o email' }, { status: 400 });
  }

  const contacto = await prisma.contactos.upsert({
    where: { email },
    update: { nombre },
    create: { nombre, email },
  });

  await prisma.listas_contactos_contactos.upsert({
    where: {
      id_lista_id_contacto: {
        id_lista,
        id_contacto: contacto.id_contacto,
      },
    },
    update: {},
    create: {
      id_lista,
      id_contacto: contacto.id_contacto,
    },
  });

  return NextResponse.json(contacto);
}
