import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server'; 
const prisma = new PrismaClient();

export async function GET() {
  try {
    const contactos = await prisma.contactos.findMany({
      select: {
        id_contacto: true,
        nombre: true,
        email: true,
      },
    });

    return NextResponse.json({ contactos }); 

  } catch (error) {
    console.error('Error al obtener contactos:', error);
    return NextResponse.json({ message: 'Error interno del servidor al obtener contactos.' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); 
  }
}