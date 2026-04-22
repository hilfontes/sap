"use client";

import { MessageCircle, Phone, User } from "lucide-react";
import { NavbarLogin } from "@/components/navbarlogin";

const contacts = [
  { name: "Srª Nelma Manuel - Secretária", phone: "+244 933 575 755" },
  { name: "Sr. Canhoca - Secretário", phone: "+244 924 111 111" },
];

export default function ContactPage() {
  return (
    <>
      <NavbarLogin />

      <div className="relative min-h-screen">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/contact.jpeg')" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Conteúdo */}
        <div className="relative z-10 text-white max-w-80 w-full p-4 pt-20">
          <h1 className="text-3xl font-bold mb-6"></h1>

          <div className="space-y-4">
            {contacts.map((contact, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md p-4 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <User size={20} />
                  <span className="font-medium">{contact.name}</span>
                </div>

                {/* <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2 hover:underline"
                >
                  <MessageCircle size={18} />
                  <span>{contact.phone}</span>
                </a> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
