"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

type NavbarLoginProps = {
  role?: string;
};

const activities = [
  {
    id: "act1",
    image: "/activity1.png",
    href: "/activities",
    title: "",
  },
  {
    id: "act2",
    image: "/activity2.png",
    href: "/activities",
    title: "",
  },
  {
    id: "act3",
    image: "/activity3.png",
    href: "/activities",
    title: "",
  },
];

export function NavbarLogin({ role }: NavbarLoginProps) {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const canSeeAdminMenus = role === "ADMIN" || role === "ADMIN_ASSOCIATE";

  const [current, setCurrent] = useState(0);

  // Carousel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === activities.length - 1 ? 0 : prev + 1));
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div
        className={`flex items-center justify-between h-14 pr-6 overflow-hidden
        ${
          isHome
            ? "bg-white/10 backdrop-blur-md"
            : "bg-[linear-gradient(to_right,white_0px,white_100px,#1e3a8a_150px,#020617_100%)] shadow-md"
        }`}
      >
        {/* ESQUERDA */}
        <div className="flex items-center h-full">
          {/* LOGO */}
          <Link href="/" className="relative h-full w-28 shrink-0">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              priority
              className="object-contain"
            />
          </Link>
        </div>
        {/* INICIO  removi aqui o carroucel para implementar a posteriory */}

        {/* FIM  removi aqui o carroucel para implementar a posteriory */}

        {/* MENUS */}
        <div className="flex items-center gap-6">
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

          {!isHome && canSeeAdminMenus && (
            <Link
              href="/reports"
              className="text-white hover:text-blue-300 transition-colors"
            >
              Report $
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
