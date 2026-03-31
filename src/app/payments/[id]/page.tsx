"use client";

import { Navbar } from "@/components/navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function PaymentsPage({ params }: PageProps) {
  const router = useRouter(); // 👈 aqui
  const { id } = use(params); // ✅ nova forma do Next.js
  const API_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const [form, setForm] = useState({
    amount: "",
    frequency: "MONTHLY",
    monthYear: "",
    OBS: "",
  });

  useEffect(() => {
    async function loadUser() {
      const res = await fetch(`${API_URL}/api/auth/eu`, {
        credentials: "include",
      });

      if (!res.ok) return;

      const data = await res.json();
      console.log("Utilizador logado:", data);
    }

    loadUser();
  }, []);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/payment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        amount: Number(form.amount),
        currency: "AOA",
        status: "PENDENTE",
        userId: Number(id),
      }),
    });

    console.log("Resposta:", await res.json());

    if (res.ok) {
      alert("Pagamento registado!");
      router.push(`/users/${id}`);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-4"
        >
          <h2 className="text-2xl font-bold text-blue-900">Novo Pagamento</h2>

          <input
            type="number"
            name="amount"
            placeholder="Valor"
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />

          <select
            name="frequency"
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="MONTHLY">Mensal</option>
            <option value="YEARLY">Anual</option>
          </select>

          <input
            type="month"
            name="monthYear"
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
          <input
            type="text"
            name="reference"
            placeholder="Referência"
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
          <textarea
            name="OBS"
            placeholder="Observação"
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />

          <button className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800">
            Pagar
          </button>
        </form>
      </div>
    </>
  );
}
