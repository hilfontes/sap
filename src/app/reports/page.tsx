"use client";

import { useState } from "react";

type Payment = {
  id: string;
  memberName: string;
  amount: number;
  paymentDate: string;
  monthYear: string;
  reference: string;
};

export default function PaymentsReportPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  async function handleSearch() {
    try {
      setLoading(true);
      const API_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
      const response = await fetch(
        `${API_URL}/api/payment/report?startDate=${startDate}&endDate=${endDate}`,
      );

      const data = await response.json();

      setPayments(data.payments);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        SAP - Relatório de Pagamento de Quotas e Joias
      </h1>

      {/* FILTROS */}
      <div className="flex gap-4 items-end mb-6">
        <div>
          <label className="block text-sm mb-1">Data Inicial</label>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Data Final</label>

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        <button
          onClick={handleSearch}
          className="bg-blue-900 text-white px-4 py-2 rounded"
        >
          {loading ? "Pesquisando..." : "Pesquisar"}
        </button>
      </div>

      {/* TABELA */}
      <div className="overflow-x-auto">
        <div className="mt-4 flex justify-end">
          <div className="border rounded bg-gray-100 px-6 py-3">
            <span className="font-semibold mr-2">Total:</span>

            <span className="font-bold text-lg">
              {Number(total).toLocaleString("pt-PT", {
                style: "currency",
                currency: "AOA",
              })}
            </span>
          </div>
        </div>
        <table className="w-full border-collapse border">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="border p-2 text-left">Associado</th>
              <th className="border p-2 text-left">Recibo</th>

              <th className="border p-2 text-left">Data Pagamento</th>
              <th className="border p-2 text-left">Ref.</th>
              <th className="border p-2 text-left">Valor</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="border p-2">{payment.memberName}</td>
                <td className="border p-2">{payment.reference}</td>

                <td className="border p-2">{payment.paymentDate}</td>

                <td className="border p-2">{payment.monthYear}</td>

                <td className="border p-2 text-right">
                  {Number(payment.amount).toLocaleString("pt-PT", {
                    style: "currency",
                    currency: "AOA",
                  })}
                </td>
              </tr>
            ))}

            {!payments.length && (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  Nenhum pagamento encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
