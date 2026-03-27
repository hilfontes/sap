"use client";

import { useState } from "react";

type Props = {
  paymentId: number;
  onSuccess: () => void;
};

export function SendReceiptButton({ paymentId, onSuccess }: Props) {
  const API_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

  const [loading, setLoading] = useState(false);

  async function sendReceipt() {
    setLoading(true);

    const res = await fetch(
      `${API_URL}/api/payments/${paymentId}/send-receipt`,
      { method: "POST" },
    );

    if (res.ok) {
      onSuccess(); // 🔹 atualiza tabela
    }

    setLoading(false);
  }

  return (
    <button
      onClick={sendReceipt}
      disabled={loading}
      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? "Enviando..." : "Enviar Recibo"}
    </button>
  );
}
