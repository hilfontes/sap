import { Navbar } from "@/components/navbar";
import { SendReceiptButton } from "@/components/SendReceiptButton";
import { PaymentsTable } from "@/components/PaymentsTable";
import Link from "next/link";
import { Plus, Settings } from "lucide-react";
import { UploadPhoto } from "@/components/ui/uploadphoto";
import { UserPhotoSection } from "@/components/ui/UserPhotoSection";

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
};

type PageProps = {
  params: Promise<{ id: number }>;
};

export default async function UserDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const userRes = await fetch(
    `http://localhost:3001/default/auth/users/${id}`,
    { cache: "no-store" },
  );

  if (!userRes.ok) {
    throw new Error("Erro ao buscar utilizador");
  }

  const user = await userRes.json();

  // 🔹 Buscar pagamentos do utilizador
  const paymentsRes = await fetch(
    `http://localhost:3001/default/payment/user/${id}`,
    { cache: "no-store" },
  );

  const payments: Payment[] = paymentsRes.ok ? await paymentsRes.json() : [];

  return (
    <>
      <Navbar />

      <div className="p-6 pt-28"></div>
      <div className="p-6 space-y-8">
        <Link
          href={`/users/${id}/edit`}
          className="bg-gray-700 text-white px-3 py-2 rounded-md hover:bg-gray-600 text-sm flex items-center gap-2 w-max"
        >
          <Settings size={16} className="text-gray-300" />
          Editar Perfil
        </Link>
        {/* ================= USER ================= */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ================= CARD ================= */}
          <section className="relative flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Barra lateral azul */}
            <div className="absolute left-0 top-0 h-full w-1.5 bg-blue-900" />

            {/* Header */}
            <div className="bg-blue-900 pl-8 pr-6 py-4">
              <h1 className="text-lg font-semibold text-white">
                Detalhes do Associado
              </h1>
            </div>

            {/* Conteúdo */}
            <div className="p-6 pl-8 bg-gray-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
                <div>
                  <p className="text-sm text-gray-500">Nome</p>
                  <p className="font-medium text-gray-900">{user.name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium text-gray-900">
                    {user.role ?? "—"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Localização</p>
                  <p className="font-medium text-gray-900">
                    {user.provinceName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Nacionalidade</p>
                  <p className="font-medium text-gray-900">
                    {user.nationality ?? "—"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">NIF</p>
                  <p className="font-medium text-gray-900">{user.nif}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Instituição</p>
                  <p className="font-medium text-gray-900">
                    {user.institution?.institutionName ?? "—"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Especialidade</p>
                  <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                    {user.specialityName ?? "—"}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Telemóvel</p>
                  <p className="font-medium text-gray-900">
                    {user.cellphone ?? "—"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= FOTO ================= */}
          <aside className="w-full lg:w-64 flex justify-center lg:justify-end">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center">
              <UploadPhoto
                userId={id}
                currentPhoto={
                  user.photo
                    ? `http://localhost:3001/auth/default/${user.photo}` // 🔥 corrigido também aqui
                    : "/avatar-placeholder.png"
                }
              />

              <p className="font-semibold text-gray-800 text-center">
                {`${user.name.split(" ")[0]} ${user.name.split(" ").slice(-1)[0]}`}
              </p>
              <p className="text-sm text-gray-500 text-center">{user.role}</p>
            </div>
          </aside>
        </div>

        {/* ================= PAYMENTS ================= */}
        <section>
          <Link
            //href="/payments"
            href={`/payments/${id}`} // 🔹 Link atualizado
            className="bg-blue-900 text-white px-3 py-4 rounded-md hover:bg-blue-850 text-sm flex items-center gap-2 w-max mb-6"
          >
            <Plus size={20} className="text-gray-300" />
            Novo Pagamento
          </Link>

          <PaymentsTable payments={payments} />
        </section>
      </div>
    </>
  );
}
