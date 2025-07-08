import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const pathSegments = req.nextUrl.pathname.split('/');
  const id = pathSegments[pathSegments.indexOf('clientes') + 1]; // ← AQUÍ está la corrección

  if (!id) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const idLista = parseInt(id);

  if (isNaN(idLista)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const listaConContactos = await prisma.listas_contactos.findUnique({
    where: { id_lista: idLista },
    include: {
      listas_contactos_contactos: {
        include: {
          contactos: true,
        },
      },
    },
  });

  if (!listaConContactos) {
    return NextResponse.json({ error: 'Lista no encontrada' }, { status: 404 });
  }

  return NextResponse.json(listaConContactos);
}

