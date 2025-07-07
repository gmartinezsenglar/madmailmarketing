import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies(); 
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'No autorizado: Token no proporcionado.' }, { status: 401 });
    }

    let decodedToken: any;
    try {
      decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (jwtError: any) {
      const message = (jwtError.name === 'JsonWebTokenError' || jwtError.name === 'TokenExpiredError')
        ? 'Token inválido o expirado.'
        : 'Error de autenticación.';
      return NextResponse.json({ error: `No autorizado: ${message}` }, { status: 401 });
    }

    const empresaId = decodedToken.empresaId;
    const body = await req.json();
    const { nombreLista, contactosExistentesIds = [], nuevosContactos = [] } = body;

    if (!nombreLista || nombreLista.trim() === '') {
      return NextResponse.json({ error: 'El nombre de la lista es obligatorio.' }, { status: 400 });
    }

    const listaExistente = await prisma.listas_contactos.findFirst({
      where: { nombre: nombreLista.trim(), empresa_id: empresaId },
    });

    if (listaExistente) {
      return NextResponse.json({ error: 'Ya existe una lista con el mismo nombre para esta empresa.' }, { status: 400 });
    }

    const { idLista } = await prisma.$transaction(async (tx) => {
      const nuevaLista = await tx.listas_contactos.create({
        data: { nombre: nombreLista.trim(), empresa_id: empresaId },
      });

      for (const contacto of nuevosContactos) {
        if (contacto.nombre?.trim() && contacto.email?.trim()) {
          try {
            const creado = await tx.contactos.create({
              data: { nombre: contacto.nombre.trim(), email: contacto.email.trim() },
            });
            await tx.listas_contactos_contactos.create({
              data: { id_contacto: creado.id_contacto, id_lista: nuevaLista.id_lista },
            });
          } catch (contactError: any) {
            throw new Error(`Error al procesar el contacto ${contacto.nombre}: ${contactError.message}`);
          }
        }
      }

      for (const id of contactosExistentesIds) {
        try {
          await tx.listas_contactos_contactos.create({
            data: { id_contacto: id, id_lista: nuevaLista.id_lista },
          });
        } catch {
        }
      }

      return { idLista: nuevaLista.id_lista };
    });

    return NextResponse.json({ message: 'Lista creada correctamente', idLista }, { status: 201 });

  } catch (error: any) {
    if (error.message.startsWith('Error al procesar el contacto')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error interno del servidor al crear la lista.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
