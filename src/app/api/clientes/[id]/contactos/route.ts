import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const id_lista = parseInt(params.id)
  const { nombre, email } = await request.json()

  const contacto = await prisma.contactos.upsert({
    where: { email },
    update: { nombre },
    create: { nombre, email },
  })

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
  })

  return NextResponse.json(contacto)
}
