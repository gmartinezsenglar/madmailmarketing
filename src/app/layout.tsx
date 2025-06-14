"use client"
import type { ReactNode } from "react"
import "./globals.css"
import Sidebar from "../components/sidebar"

type LayoutPropiedades = {
  children: ReactNode
}

export default function RootLayout({ children }: LayoutPropiedades) {
  return (
    <html lang="es">
      <body className="flex min-h-screen bg-stone-300">
        <Sidebar />
        <main className="flex-1 transition-all duration-300 ease-in-out">{children}</main>
      </body>
    </html>
  )
}
