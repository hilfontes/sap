"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";

type NavbarLogin1Props = {
  role?: string;
};

export function NavbarLogin1({ role }: NavbarLogin1Props) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const canSeeAdminMenus = role === "ADMIN" || role === "ADMIN_ASSOCIATE";

  // Definimos a cor do fundo do logo para o início do gradiente
  // Olhando para a imagem, parece ser algo próximo de #f8f9fa ou branco puro.
  // Vou usar o gradiente de "white" para "blue-950".
  const gradientBg = "bg-gradient-to-r from-white via-[#f8f9fa] to-green-950";

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div
        className={`flex items-center justify-between pl-0 pr-6 h-14 transition-all duration-500
          ${isHome ? "bg-white/10 backdrop-blur-md" : `${gradientBg} shadow-md`}
        `}
      >
        {/* Logo / Nome */}
        <div className="flex items-center h-full">
          {/* Adicionei uma leve margem/padding para o logo não colar na borda e respirar no gradiente */}
          <Link href="/" className="relative h-full w-40 cursor-pointer ml-4">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              priority
              className="object-contain"
            />
          </Link>
        </div>

        {/* Rotas */}
        <div className="flex gap-6 items-center">
          <Link
            href="/activities"
            className="text-white hover:text-blue-300 transition-colors font-medium drop-shadow-sm"
          >
            Actividades
          </Link>

          {!isHome && canSeeAdminMenus && (
            <Link
              href="/users"
              className="text-white hover:text-blue-300 transition-colors font-medium drop-shadow-sm"
            >
              Associados
            </Link>
          )}

          <Link
            href="/contact"
            className="text-white hover:text-blue-300 transition-colors font-medium drop-shadow-sm"
          >
            Contactos
          </Link>

          {!isHome && canSeeAdminMenus && (
            <Link
              href="/dashboard"
              className="text-white hover:text-blue-300 transition-colors font-medium drop-shadow-sm"
            >
              Dashboard
            </Link>
          )}

          <Link
            href="/"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 transition border border-white/10"
          >
            <User size={20} className="text-white" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
