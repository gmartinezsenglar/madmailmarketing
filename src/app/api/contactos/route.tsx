import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const contactos = await prisma.contactos.findMany({
    select: {
      id_contacto: true,
      nombre: true,
      email: true,
    },
  })
  return Response.json(contactos)
}
