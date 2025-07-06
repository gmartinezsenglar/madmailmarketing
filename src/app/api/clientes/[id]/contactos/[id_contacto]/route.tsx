import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function DELETE(_: Request, { params }: { params: { id: string, id_contacto: string } }) {
  await prisma.listas_contactos_contactos.delete({
    where: {
      id_lista_id_contacto: {
        id_lista: parseInt(params.id),
        id_contacto: parseInt(params.id_contacto),
      }
    }
  })

  return NextResponse.json({ ok: true })
}
