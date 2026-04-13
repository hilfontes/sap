"use client";

//import { PaymentsTable } from "@/components/PaymentsTable";
import { useState } from "react";
//import { SendReceiptButton } from "@/components/SendReceiptButton";
import { GeneratePDF } from "@/components/GeneratePDF";
import {
  Calendar,
  DollarSign,
  Coins,
  Repeat,
  CheckCircle,
  Hash,
  MailCheck,
  Settings,
  CheckCheckIcon,
  Receipt,
} from "lucide-react";
import { generateReceiptHTML } from "@/lib/generateReceiptHTML";
import { ReceiptModal } from "./ReceiptModal";

type Payment = {
  id: number;
  amount: number;
  currency: string;
  status: string;
  monthYear: string;
  frequency: string;
  reference?: string;
  sentReceipt: boolean;

  user?: {
    name: string;
    nif: string;
    cellphone: string;
    province: string;
  };
};

type Props = {
  payments: Payment[];
  user: any;
};

export function PaymentsTable({ payments, user }: Props) {
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [data, setData] = useState(payments);
  const [selectedHTML, setSelectedHTML] = useState<string | null>(null);

  function markAsSent(id: number) {
    setData((prev) =>
      prev.map((p) => (p.id === id ? { ...p, sentReceipt: true } : p)),
    );
  }

  const [loadingId, setLoadingId] = useState<number | null>(null);

  async function confirmPayment(id: number) {
    setLoadingId(id);

    try {
      const API_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
      const res = await fetch(`${API_URL}/api/payment/${id}/confirm`, {
        method: "PATCH",
      });

      if (!res.ok) throw new Error();

      setData((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "PAGO" } : p)),
      );
    } catch {
      alert("Erro ao confirmar pagamento");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead className="bg-blue-900">
            <tr>
              <th className="text-white p-3 text-left">
                <div className="flex items-center gap-2">
                  <Calendar size={16} /> Mês/Ano
                </div>
              </th>

              <th className="text-white p-3 text-left">
                <div className="flex items-center gap-2">
                  <DollarSign size={16} /> Valor
                </div>
              </th>

              <th className="text-white p-3 text-left">
                <div className="flex items-center gap-2">
                  <Coins size={16} /> Moeda
                </div>
              </th>

              <th className="text-white p-3 text-left">
                <div className="flex items-center gap-2">
                  <Repeat size={16} /> Frequência
                </div>
              </th>

              <th className="text-white p-3 text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} /> Estado
                </div>
              </th>

              <th className="text-white p-3 text-left">
                <div className="flex items-center gap-2">
                  <Hash size={16} /> Referência
                </div>
              </th>

              <th className="text-white p-3 text-left">
                <div className="flex items-center gap-2">
                  <CheckCheckIcon size={16} /> Pagamento?
                </div>
              </th>

              <th className="text-white p-3 text-left">
                <div className="flex items-center gap-2">
                  <Receipt size={16} /> Ação
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((payment) => (
              <tr key={payment.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{payment.monthYear}</td>

                <td className="p-3">
                  {payment.amount.toLocaleString("pt-PT")} {payment.currency}
                </td>

                <td className="p-3">{payment.currency}</td>

                <td className="p-3">{payment.frequency}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      payment.status === "PAGO"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>

                <td className="p-3">{payment.reference ?? "-"}</td>

                {/* ✅ Campo atualizado */}
                <td className="h-14 p-3 flex gap-2">
                  {/* BOTÃO CONFIRMAR PAGAMENTO */}
                  {payment.status !== "PAGO" && (
                    <button
                      onClick={() => setConfirmId(payment.id)}
                      className="h-8 px-3 bg-green-600 text-white text-xs rounded hover:bg-green-800"
                    >
                      Confirmar
                    </button>
                  )}
                  -
                </td>

                <td className="p-3">
                  <div className="h-8 flex items-center">
                    {payment.status === "PAGO" ? (
                      payment.sentReceipt ? (
                        <span className="text-green-700 font-medium">-</span>
                      ) : (
                        <GeneratePDF
                          html={generateReceiptHTML(payment, user)}
                        />
                      )
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 👇 AQUI FICA O MODAL */}
      {selectedHTML && (
        <ReceiptModal
          html={selectedHTML}
          onClose={() => setSelectedHTML(null)}
        />
      )}
      {confirmId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">Confirmar pagamento</h2>

            <p className="text-sm text-gray-600 mb-6">
              Tens certeza que desejas confirmar este pagamento?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
              >
                Cancelar
              </button>

              <button
                onClick={async () => {
                  await confirmPayment(confirmId);
                  setConfirmId(null);
                }}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-800"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
