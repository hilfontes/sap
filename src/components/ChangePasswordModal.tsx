"use client";

import { useState } from "react";

export default function ChangePasswordModal({ isOpen, onClose }) {
  const API_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const response = await fetch(`${API_URL}/api/auth/change-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      alert("Erro ao alterar senha");
      return;
    }

    alert("Senha alterada com sucesso!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-lg font-bold mb-4">Alterar Senha</h2>

        <input
          type="password"
          placeholder="Nova senha"
          className="w-full border p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={!password}
          className="w-full bg-blue-950 text-white p-2 rounded disabled:opacity-50"
        >
          Guardar nova senha
        </button>
      </div>
    </div>
  );
}
