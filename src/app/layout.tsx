'use client'
import { ReactNode } from 'react';
import './globals.css'

type LayoutPropiedades = {
  children: ReactNode;
};

export default function RootLayout({ children }: LayoutPropiedades) {
  
  return (
    <html lang="es">
      <body className="flex min-h-screen">
        <main className="flex-1 p-8 bg-stone-300 ">{children}</main>
      </body>
    </html>
  );
}
