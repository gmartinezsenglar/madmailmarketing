import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  const url = req.nextUrl;
  const pathSegments = url.pathname.split('/');

  const id = pathSegments[pathSegments.indexOf('clientes') + 1];
  const id_contacto = pathSegments[pathSegments.indexOf('contactos') + 1];

  if (!id || !id_contacto) {
    return NextResponse.json({ error: 'Parámetros inválidos' }, { status: 400 });
  }

  await prisma.listas_contactos_contactos.delete({
    where: {
      id_lista_id_contacto: {
        id_lista: parseInt(id),
        id_contacto: parseInt(id_contacto),
      }
    }
  });

  return NextResponse.json({ ok: true });
}
