import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const idLista = parseInt(params.id)

  const listaConContactos = await prisma.listas_contactos.findUnique({
    where: { id_lista: idLista },
    include: {
      listas_contactos_contactos: {
        include: {
          contactos: true
        }
      }
    }
  })

  return new Response(JSON.stringify(listaConContactos), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
