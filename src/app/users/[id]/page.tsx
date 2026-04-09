import { Navbar } from "@/components/navbar";
import { SendReceiptButton } from "@/components/SendReceiptButton";
import { PaymentsTable } from "@/components/PaymentsTable";
import Link from "next/link";
import { Plus, Settings } from "lucide-react";
import { UploadPhoto } from "@/components/ui/uploadphoto";
import { UserPhotoSection } from "@/components/ui/UserPhotoSection";
import {
  User,
  Mail,
  MapPin,
  Flag,
  ReceiptText,
  Building2,
  Briefcase,
  Phone,
  CreditCard,
  BadgeCheck,
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
  OBS?: string;
  createdAt: string;
  paidAll: boolean;
  feePayd: boolean;
};

type PageProps = {
  params: Promise<{ id: number }>;
};

export default async function UserDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const API_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const userRes = await fetch(`${API_URL}/api/auth/users/${id}`, {
    cache: "no-store",
  });

  if (!userRes.ok) {
    throw new Error("Erro ao buscar utilizador");
  }

  const user = await userRes.json();
  console.log("User data:", user); // 🔍 Log para verificar os dados do utilizador
  // 🔹 Buscar pagamentos do utilizador
  const paymentsRes = await fetch(`${API_URL}/api/payment/user/${id}`, {
    cache: "no-store",
  });

  const payments: Payment[] = paymentsRes.ok ? await paymentsRes.json() : [];

  return (
    <>
      <Navbar />

      <div className="p-6 pt-8"></div>
      <div className="p-6 space-y-8">
        {/* ================= USER ================= */}
        <div className="flex flex-col lg:flex-row gap-0">
          {/* ================= CARD ================= */}
          <section className="relative flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden lg:rounded-r-none">
            {/* Barra lateral azul */}
            <div className="absolute left-0 top-0 h-full w-1.5 bg-blue-900" />

            {/* Header */}
            {/*             <div className="bg-blue-900 pl-8 pr-6 py-4">
              <h1 className="text-lg font-semibold text-white">
                Detalhes do Associado
              </h1>
            </div> */}

            {/* Conteúdo */}
            <div className="p-6 pl-8 bg-gray-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <User size={14} /> Nome
                  </p>
                  <p className="font-medium text-gray-900">{user.name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Mail size={14} /> Email
                  </p>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <MapPin size={14} /> Localização
                  </p>
                  <p className="font-medium text-gray-900">
                    {user.provinceName ?? "—"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Flag size={14} /> Nacionalidade
                  </p>
                  <p className="font-medium text-gray-900">
                    {user.nationalityName ?? "—"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <ReceiptText size={14} /> NIF
                  </p>
                  <p className="font-medium text-gray-900">{user.nif ?? "—"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Building2 size={14} /> Instituição
                  </p>
                  <p className="font-medium text-gray-900">
                    {user.institution?.institutionName ?? "—"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Briefcase size={14} /> Especialidade
                  </p>
                  <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                    {user.speciality?.specialityName ?? "—"}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <BadgeCheck size={14} /> Quotas Regularizadas?
                  </p>
                  <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                    {user.paidAll ? "Sim" : "Não"}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <CreditCard size={14} /> Pagou a Joia?
                  </p>
                  <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                    {user.feePayd ? "Sim" : "Não"}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Phone size={14} /> Telemóvel
                  </p>
                  <p className="font-medium text-gray-900">
                    {user.cellphone ?? "—"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <CreditCard size={14} /> Situação Financeira
                  </p>
                  <p className="font-medium text-gray-900">
                    {user.financeStatus ?? "—"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= FOTO ================= */}
          <aside className="w-full lg:w-64 flex justify-center lg:rounded-l-none">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center">
              <UploadPhoto userId={id} currentPhoto={user.photo} />
              <p className="font-semibold text-gray-800 text-center">
                {`${user.name.split(" ")[0]} ${user.name.split(" ").slice(-1)[0]}`}
              </p>
            </div>
          </aside>
        </div>

        {/* ================= PAYMENTS ================= */}
        <section>
          <div className="flex gap-3 mb-4">
            <Link
              href={`/users/${id}/edit`}
              className="w-auto bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 text-sm flex items-center justify-center gap-2"
            >
              <Settings size={16} className="text-gray-300" />
              Editar Perfil
            </Link>

            <Link
              href={`/payments/${id}`}
              className="w-auto bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 text-sm flex items-center justify-center gap-2"
            >
              <Plus size={16} className="text-gray-300" />
              Novo Pagamento
            </Link>
          </div>

          <PaymentsTable payments={payments} user={user} />
        </section>
      </div>
    </>
  );
}
