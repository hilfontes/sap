"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";

export function NavbarLogin() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div
        className={`flex items-center justify-between px-8 py-4 transition-colors duration-300
          ${isHome ? "bg-white/10 backdrop-blur-md" : "bg-blue-950 shadow-md"}
        `}
      >
        {/* Logo / Nome */}
        <div className="flex items-center">
          <div className="relative h-10 w-20 overflow-hidden rounded-full">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-cover"
              priority
            />
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

          <Link
            href="/contact"
            className="text-white hover:text-blue-300 transition-colors"
          >
            Contactos
          </Link>

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
