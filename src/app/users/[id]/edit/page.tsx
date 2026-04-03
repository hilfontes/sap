"use client";

import { Navbar } from "@/components/navbar";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Briefcase,
  Flag,
  CreditCard,
  ReceiptText,
} from "lucide-react";

const userSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  location: z.string().optional(),
  address: z.string().optional(),
  institutionId: z.string(),
  nationalityId: z.string(),
  nif: z.string().optional(),
  cellphone: z.string().optional(),
  provinceId: z.string().optional(),
  specialityId: z.string().optional(),
  role: z.string().optional(),
  paidAll: z.boolean().optional(),
  feePayd: z.boolean().optional(),
  financeStatus: z.string().optional(),
});

type FormData = z.infer<typeof userSchema>;

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function EditUserPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  //const [loaded, setLoaded] = useState(false);
  const [institutions, setInstitutions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [nationalities, setNationalities] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const form = useForm<FormData>({
    resolver: zodResolver(userSchema),
  });

  // 🔹 carregar utilizador
  useEffect(() => {
    async function loadAll() {
      try {
        const [userRes, instRes, provRes, specRes, natRes] = await Promise.all([
          fetch(`${API_URL}/api/auth/users/${id}`),
          fetch(`${API_URL}/api/institutions/getinstitutions`),
          fetch(`${API_URL}/api/provinces/getprovinces`),
          fetch(`${API_URL}/api/specialities/getspecialities`),
          fetch(`${API_URL}/api/nationalities/getnationalities`),
        ]);

        const [user, instData, provData, specData, natData] = await Promise.all(
          [
            userRes.json(),
            instRes.json(),
            provRes.json(),
            specRes.json(),
            natRes.json(),
          ],
        );

        // 🔥 primeiro preencher os selects
        setInstitutions(instData);
        setProvinces(Array.isArray(provData) ? provData : provData.data || []);
        setSpecialities(
          Array.isArray(specData) ? specData : specData.data || [],
        );
        setNationalities(Array.isArray(natData) ? natData : natData.data || []);
        // 🔥 depois resetar form
        form.reset({
          name: user.name,
          email: user.email,
          location: user.location,
          address: user.address,
          institutionId: user.institutionId?.toString(),
          nif: user.nif,
          cellphone: user.cellphone,
          provinceId: user.provinceId?.toString(),
          specialityId: user.specialityId?.toString(),
          nationalityId: user.nationalityId?.toString(),
          feePayd: user.feePayd,
          paidAll: user.paidAll,
          financeStatus: user.financeStatus,
        });
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    loadAll();
  }, [id]);

  const onSubmit = async (data: FormData) => {
    console.log("Dados do formulário:", data);
    const res = await fetch(`${API_URL}/api/auth/updateuser/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        institution: {
          connect: { id: Number(data.institutionId) },
        },
        province: {
          connect: { id: Number(data.provinceId) },
        },
        speciality: {
          connect: { id: Number(data.specialityId) },
        },
        nationality: {
          connect: { id: Number(data.nationalityId) },
        },
      }),
    });

    if (res.ok) {
      alert("Utilizador atualizado!");
      router.push(`/users/${id}`);
    } else {
      console.error("Erro ao atualizar utilizador:", await res.text());
      alert("Erro ao atualizar utilizador");
    }
  };
  //console.log("fordata", form.getValues());
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-10">
        <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
          {/* ================= DADOS PESSOAIS ================= */}
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Dados Pessoais
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome */}
            <div>
              <label className="block text-sm">Nome</label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  {...form.register("name")}
                  className="w-full border rounded-md p-2 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm">Email</label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  {...form.register("email")}
                  className="w-full border rounded-md p-2 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* NIF */}
            <div>
              <label className="block text-sm">NIF</label>
              <div className="relative">
                <ReceiptText
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  {...form.register("nif")}
                  className="w-full border rounded-md p-2 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Telemóvel */}
            <div>
              <label className="block text-sm">Telemóvel</label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  {...form.register("cellphone")}
                  className="w-full border rounded-md p-2 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Província */}
            <div>
              <label className="block text-sm">Localização</label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={18}
                />
                <select
                  {...form.register("provinceId")}
                  className="w-full border rounded-md p-2 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Selecionar Localização actual</option>
                  {provinces.map((prov: any) => (
                    <option key={prov.id} value={prov.id.toString()}>
                      {prov.provinceName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Nacionalidade */}
            <div>
              <label className="block text-sm">Nacionalidade</label>
              <div className="relative">
                <Flag
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={18}
                />
                <select
                  {...form.register("nationalityId")}
                  className="w-full border rounded-md p-2 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Selecionar Nacionalidade</option>
                  {nationalities.map((nat: any) => (
                    <option key={nat.id} value={nat.id.toString()}>
                      {nat.nationalityName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ================= DADOS PROFISSIONAIS ================= */}
          <h3 className="text-lg font-semibold text-blue-900 mt-6 mb-4">
            Dados Profissionais
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Especialidade */}
            <div>
              <label className="block text-sm">Especialidade</label>
              <div className="relative">
                <Briefcase
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={18}
                />
                <select
                  {...form.register("specialityId")}
                  className="w-full border rounded-md p-2 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Selecionar Especialidade</option>
                  {specialities.map((spec: any) => (
                    <option key={spec.id} value={spec.id.toString()}>
                      {spec.specialityName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Instituição */}
            <div>
              <label className="block text-sm">Instituição</label>
              <div className="relative">
                <Building2
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={18}
                />
                <select
                  {...form.register("institutionId")}
                  className="w-full border rounded-md p-2 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Selecionar instituição</option>
                  {institutions.map((inst: any) => (
                    <option key={inst.id} value={inst.id.toString()}>
                      {inst.institutionName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ================= INFORMAÇÃO FINANCEIRA ================= */}
          <h3 className="text-lg font-semibold text-blue-900 mt-6 mb-4">
            Informação Financeira
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Joia */}
            <div className="flex items-center gap-2">
              <CreditCard size={16} className="text-gray-500" />
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...form.register("feePayd")} />
                Joia Paga?
              </label>
            </div>

            {/* Quotas */}
            <div className="flex items-center gap-2">
              <CreditCard size={16} className="text-gray-500" />
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...form.register("paidAll")} />
                Quotas Regularizadas?
              </label>
            </div>
          </div>

          {/* FInanceStatus */}
          <div>
            <label className="block text-sm">Situação Financeira</label>
            <div className="relative">
              <ReceiptText
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                {...form.register("financeStatus")}
                className="w-full border rounded-md p-2 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          {/* BOTÕES */}
          <div className="flex justify-start gap-3 mt-6">
            <button
              type="button"
              onClick={() => onSubmit(form.getValues())}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-black cursor-pointer"
            >
              Guardar Alterações
            </button>

            <button
              type="button"
              onClick={() => router.push(`/users/${id}`)}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-black cursor-pointer hover:text-white"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
