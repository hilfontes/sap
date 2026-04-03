"use client";

//import { PaymentsTable } from "@/components/PaymentsTable";
import { useState } from "react";
import { SendReceiptButton } from "@/components/SendReceiptButton";
import {
  Calendar,
  DollarSign,
  Coins,
  Repeat,
  CheckCircle,
  Hash,
  MailCheck,
  Settings,
} from "lucide-react";

type Payment = {
  id: number;
  amount: number;
  currency: string;
  status: string;
  monthYear: string;
  frequency: string;
  reference?: string;
  sentReceipt: boolean;
};

type Props = {
  payments: Payment[];
};

export function PaymentsTable({ payments }: Props) {
  const [data, setData] = useState(payments);

  function markAsSent(id: number) {
    setData((prev) =>
      prev.map((p) => (p.id === id ? { ...p, sentReceipt: true } : p)),
    );
  }

  return (
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
                <MailCheck size={16} /> Recibo Enviado?
              </div>
            </th>

            <th className="text-white p-3 text-left">
              <div className="flex items-center gap-2">
                <Settings size={16} /> Ação
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((payment) => (
            <tr key={payment.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{payment.monthYear}</td>

              <td className="p-3">
                {payment.amount.toLocaleString()} {payment.currency}
              </td>

              <td className="p-3">{payment.currency}</td>

              <td className="p-3">{payment.frequency}</td>

              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    payment.status === "PAID"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {payment.status}
                </span>
              </td>

              <td className="p-3">{payment.reference ?? "-"}</td>

              {/* ✅ Campo atualizado */}
              <td className="p-3">{payment.sentReceipt ? "Sim" : "Não"}</td>

              <td className="p-3">
                {payment.sentReceipt ? (
                  <span className="text-green-700 font-medium">Enviado</span>
                ) : (
                  <SendReceiptButton
                    paymentId={payment.id}
                    onSuccess={() => markAsSent(payment.id)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
