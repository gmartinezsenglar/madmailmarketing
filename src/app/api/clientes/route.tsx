import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const empresaId = parseInt(searchParams.get('empresaId') || '0')

  const listas = await prisma.listas_contactos.findMany({
    where: { empresa_id: empresaId },
    select: {
      id_lista: true,
      nombre: true,
    },
  })

  return NextResponse.json(listas)
}
