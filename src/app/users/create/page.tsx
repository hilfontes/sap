"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import { Navbar } from "@/components/navbar";
import {
  Briefcase,
  Building2,
  CreditCard,
  Flag,
  Mail,
  MapPin,
  User,
  LockIcon,
  Paperclip,
  ActivityIcon,
  PiggyBank,
  IdCardIcon,
  Phone,
} from "lucide-react";
import { NavbarLogin } from "@/components/navbarlogin";

const API_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

const cookieString = document.cookie;
const role = cookieString
  .split("; ")
  .find((row) => row.startsWith("role="))
  ?.split("=")[1];
const token = cookieString
  .split("; ")
  .find((row) => row.startsWith("token="))
  ?.split("=")[1];

// ✅ schema validação
const schema = z.object({
  name: z.string().min(3, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(3, "Mínimo 3 caracteres"),
  provinceId: z.string().min(1, "Selecione a província"),
  institutionId: z.string().min(1, "Selecione a instituição"),
  location: z.string(),
  role: z.string(),
  specialityId: z.string().min(1, "Selecione a especialidade"),
  nationalityId: z.string().min(1, "Selecione a nacionalidade"),
  feePayd: z.boolean(),
  paidAll: z.boolean(),
  financeStatus: z.string(),
  nif: z.string(),
  cellphone: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function CreateUserPage() {
  const router = useRouter();

  const [provinces, setProvinces] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [nationalities, setNationalities] = useState([]);

  // 🔥 react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      location: "...",
      role: "ASSOCIATE",
    },
  });

  // 🔄 carregar dados
  useEffect(() => {
    fetch(`${API_URL}/api/provinces/getprovinces`)
      .then((res) => res.json())
      .then(setProvinces);

    fetch(`${API_URL}/api/institutions/getinstitutions`)
      .then((res) => res.json())
      .then(setInstitutions);

    fetch(`${API_URL}/api/specialities/getspecialities`)
      .then((res) => res.json())
      .then(setSpecialities);

    fetch(`${API_URL}/api/nationalities/getnationalities`)
      .then((res) => res.json())
      .then(setNationalities);
  }, []);

  // 🚀 submit
  const onSubmit = async (data: FormData) => {
    try {
      console.log(data);
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          role: "ASSOCIATE",
          localidade: "...",
          address: "...",
          provinceId: Number(data.provinceId),
          institutionId: Number(data.institutionId),
          specialityId: Number(data.specialityId),
          nationalityId: Number(data.nationalityId),
          feepayd: data.feePayd || false,
          paidAll: data.paidAll || false,
          financeStatus: data.financeStatus,
          nif: data.nif,
          cellphone: data.cellphone,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Associado criado com sucesso 🎉");

      setTimeout(() => {
        router.push("/users");
        router.refresh();
      }, 1200);
    } catch {
      toast.error("Erro ao criar associado ❌");
    }
  };
  console.log(getValues());
  return (
    <>
      <NavbarLogin role={role} />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 mt-10">
        <Toaster position="top-right" />

        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl mb-2">
          <h1 className="text-2xl font-semibold mb-2 text-center">
            Novo Associado
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* ================= DADOS PESSOAIS ================= */}
            <h3 className="text-md font-semibold text-blue-900 mb-2">
              Dados Pessoais
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nome */}
              <div>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    placeholder="Nome"
                    {...register("name")}
                    className="w-full border p-2 pl-10 rounded-md"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* NIF */}
              <div>
                <div className="relative">
                  <IdCardIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    placeholder="nif"
                    {...register("nif")}
                    className="w-full border p-2 pl-10 rounded-md"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    placeholder="Email"
                    {...register("email")}
                    className="w-full border p-2 pl-10 rounded-md"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <LockIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="password"
                    placeholder="Senha"
                    {...register("password")}
                    className="w-full border p-2 pl-10 rounded-md"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Nacionalidade */}
              <div>
                <div className="relative">
                  <Flag
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={18}
                  />
                  <select
                    {...register("nationalityId")}
                    className="w-full border p-2 pl-10 rounded-md"
                  >
                    <option value="">Selecionar nacionalidade</option>
                    {nationalities.map((nat: any) => (
                      <option key={nat.id} value={nat.id.toString()}>
                        {nat.nationalityName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Província */}
              <div>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={18}
                  />
                  <select
                    {...register("provinceId")}
                    className="w-full border p-2 pl-10 rounded-md"
                  >
                    <option value="">Selecionar Localização</option>
                    {provinces.map((prov: any) => (
                      <option key={prov.id} value={prov.id.toString()}>
                        {prov.provinceName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {/* Celphone */}
            <div>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  placeholder="cellphone"
                  {...register("cellphone")}
                  className="w-85 border p-2 pl-10 rounded-md"
                />
              </div>
            </div>

            {/* ================= DADOS PROFISSIONAIS ================= */}
            <h3 className="text-md font-semibold text-blue-900 mb-2">
              Dados Profissionais
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Especialidade */}
              <div>
                <div className="relative">
                  <Briefcase
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={18}
                  />
                  <select
                    {...register("specialityId")}
                    className="w-full border p-2 pl-10 rounded-md"
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
                <div className="relative">
                  <Building2
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={18}
                  />
                  <select
                    {...register("institutionId")}
                    className="w-full border p-2 pl-10 rounded-md"
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
            <h3 className="text-md font-semibold text-blue-900 mb-2">
              Informação Financeira
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Quotas */}
              <div className="flex items-center gap-2">
                <CreditCard size={16} className="text-gray-500" />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("paidAll")}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  Quotas Regularizadas
                </label>
              </div>

              {/* Joia */}
              <div className="flex items-center gap-2">
                <PiggyBank size={16} className="text-gray-500" />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("feePayd")}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  Joia Paga
                </label>
              </div>
            </div>
            {/* FinanceState */}
            <div>
              <div className="relative">
                <ActivityIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  placeholder="Situação Financeira"
                  {...register("financeStatus")}
                  className="w-full border p-2 pl-10 rounded-md"
                />
              </div>
            </div>
            {/* ================= BOTÕES ================= */}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white p-2 rounded-md hover:bg-black cursor-pointer hover:text-white"
              >
                {isSubmitting ? "A criar..." : "Criar"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/users")}
                className="flex-1 border p-2 rounded-md hover:bg-black cursor-pointer hover:text-white"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
