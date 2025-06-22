import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const contactos = await prisma.listas_contactos.findMany({
    select: {
      id_lista: true,
      nombre: true,
    },
  })
  return Response.json(contactos)
}
