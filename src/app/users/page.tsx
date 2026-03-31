"use client";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  location: string;
  address: string;
  nif: string;
  cellphone: string;
  role: string;
  institution: {
    id: number;
    institutionName: string;
  };
  province: {
    id: number;
    provinceName: string;
  };
  speciality: {
    id: number;
    specialityName: string;
  };
};

const ITEMS_PER_PAGE = 15;
const API_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`${API_URL}/api/auth/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  // 🔍 Pesquisa por nome e email
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

  // 📄 Paginação
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(start, start + ITEMS_PER_PAGE);

  return (
    <>
      <Navbar />

      <div className="p-6 pt-20"></div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          {/* Título */}
          <div className="flex flex-col">
            <span className="bg-blue-300 text-blue-800 text-xs font-medium px-5.5 py-1.5 rounded-full">
              TOTAL ASSOCIADOS: {users.length}
            </span>
          </div>

          {/* Grupo da direita */}
          <div className="flex items-center gap-3">
            {/* 🔍 Pesquisa */}
            <input
              type="text"
              placeholder="Pesquisar por nome ou email..."
              className="border p-2 rounded w-60 h-10"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

            {/* Botão */}
            <Link
              href="/users/create"
              className="h-10 flex items-center bg-green-900 text-white px-4 rounded-md hover:bg-green-800 text-sm"
            >
              + Novo Associado
            </Link>
          </div>
        </div>

        {/* 📊 Tabela */}
        <div className="overflow-x-auto">
          <div className="rounded-xl overflow-hidden border border-gray-300 shadow-sm">
            <table className="w-full border-separate border-spacing-0">
              <thead className="bg-gray-500">
                <tr>
                  <th className="text-white p-3 text-left">Nome</th>
                  <th className="text-white p-3 text-left">Email</th>
                  <th className="text-white p-3 text-left">Localização</th>

                  <th className="text-white p-3 text-left">Especialidade</th>
                  <th className="text-white p-3 text-left">Ações</th>
                </tr>
              </thead>

              <tbody className="bg-gray-200">
                {paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-gray-300 hover:bg-gray-300 transition"
                  >
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.province?.provinceName}</td>

                    <td className="p-3">{user.speciality?.specialityName}</td>

                    <td className="p-3">
                      <Link
                        href={`/users/${user.id}`}
                        className="bg-blue-900 text-white px-3 py-1 rounded-md hover:bg-blue-800 text-sm"
                      >
                        Detalhes
                      </Link>
                    </td>
                  </tr>
                ))}

                {paginatedUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-500">
                      Nenhum usuário encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ⏮️ Paginação */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Anterior
          </button>

          <span className="px-3 py-1">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>
    </>
  );
}
