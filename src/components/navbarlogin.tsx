"use client";
import Image from "next/image";
import Link from "next/link";
//import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";

type NavbarLoginProps = {
  role?: string;
};

export function NavbarLogin({ role }: NavbarLoginProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const canSeeAdminMenus = role === "ADMIN" || role === "ADMIN_ASSOCIATE";

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div
        className={`flex items-center justify-between px-8 h-14 transition-colors duration-300
    ${isHome ? "bg-white/10 backdrop-blur-md" : "bg-blue-950 shadow-md"}
  `}
      >
        {/* Logo / Nome */}
        <div className="flex items-center">
          <div className="relative h-12 w-22 overflow-hidden">
            <Image src="/logo.png" alt="Logo" fill priority />
          </div>
        </div>

        {/* Rotas */}
        <div className="flex gap-6 items-center">
          <Link
            href="/activities"
            className="text-white hover:text-blue-300 transition-colors"
          >
            Actividades
          </Link>

          {!isHome && canSeeAdminMenus && (
            <Link
              href="/users"
              className="text-white hover:text-blue-300 transition-colors"
            >
              Associados
            </Link>
          )}

          <Link
            href="/contact"
            className="text-white hover:text-blue-300 transition-colors"
          >
            Contactos
          </Link>
          {!isHome && canSeeAdminMenus && (
            <Link
              href="/dashboard"
              className="text-white hover:text-blue-300 transition-colors"
            >
              Dashboard
            </Link>
          )}
          <Link
            href="/"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <User size={20} className="text-white" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
