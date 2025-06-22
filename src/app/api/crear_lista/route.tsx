import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { nombreLista, contactosExistentesIds = [], nuevosContactos = [], empresaId } = body
    const nuevaLista = await prisma.listas_contactos.create({
      data: {
        nombre: nombreLista,
        empresa_id: empresaId,
      },
    })

    const idLista = nuevaLista.id_lista

    const nuevosContactosInsertados = await Promise.all(
      nuevosContactos.map(async (contacto: { nombre: string; email: string }) => {
        const creado = await prisma.contactos.create({
          data: {
            nombre: contacto.nombre,
            email: contacto.email,
          },
        })

        await prisma.listas_contactos_contactos.create({
          data: {
            id_contacto: creado.id_contacto,
            id_lista: idLista,
          },
        })

        return creado
      })
    )

    await Promise.all(
      contactosExistentesIds.map(async (id: number) => {
        await prisma.listas_contactos_contactos.create({
          data: {
            id_contacto: id,
            id_lista: idLista,
          },
        })
      })
    )

    return new Response(JSON.stringify({ message: 'Lista y contactos creados correctamente' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error al crear lista:', error)
    return new Response(JSON.stringify({ error: 'Error al crear la lista' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
