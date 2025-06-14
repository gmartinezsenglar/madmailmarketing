"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false) // Cambié a false por defecto

  // Cargar estado del sidebar desde localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-open")
    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState))
    }
  }, [])

  // Guardar estado en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("sidebar-open", JSON.stringify(isOpen))
  }, [isOpen])

  const navItems = [
    { href: "/", label: "Inicio", icon: "🏠" },
    { href: "/campanas", label: "Campañas", icon: "📧" },
    { href: "/clientes", label: "Clientes", icon: "👥" },
    { href: "/perfil", label: "Perfil", icon: "👤" },
    { href: "/login", label: "Login", icon: "🔐" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Botón para mostrar/ocultar sidebar */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg shadow-lg transition-all duration-200"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Overlay para cerrar sidebar en móvil */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={toggleSidebar} />}

      {/* Sidebar - ARREGLADO: ahora el contenido se oculta correctamente */}
      <div
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-gray-800 via-gray-900 to-black shadow-2xl z-40 transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-0"
        }`}
        style={{ overflow: isOpen ? "visible" : "hidden" }} // Esto es clave para ocultar el contenido
      >
        {/* Solo mostrar el contenido si está abierto */}
        {isOpen && (
          <div className="p-6 h-full">
            {/* Logo/Título */}
            <div className="mb-8 mt-12">
              <h2 className="text-2xl font-bold text-sky-300 text-center">MadMail</h2>
              <p className="text-gray-400 text-sm text-center mt-1">Marketing Inc.</p>
            </div>

            {/* Navegación */}
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? "bg-sky-400 text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Link>
              ))}
            </nav>

            {/* Información adicional */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="text-xs text-gray-500 text-center">
                <p>Sistema de Gestión</p>
                <p>Email Marketing</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
