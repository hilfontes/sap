"use client";

import { Navbar } from "@/components/navbar";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const userSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  location: z.string().optional(),
  address: z.string().optional(),
  institutionId: z.string(),
  nif: z.string().optional(),
  cellphone: z.string().optional(),
  provinceId: z.string().optional(),
  specialityId: z.string().optional(),
  role: z.string().optional(),
});

type FormData = z.infer<typeof userSchema>;

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function EditUserPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [institutions, setInstitutions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const form = useForm<FormData>({
    resolver: zodResolver(userSchema),
  });

  // 🔹 carregar utilizador
  useEffect(() => {
    async function loadAll() {
      try {
        const [userRes, instRes, provRes, specRes] = await Promise.all([
          fetch(`${API_URL}/api/auth/users/${id}`),
          fetch(`${API_URL}/api/institutions/getinstitutions`),
          fetch(`${API_URL}/api/provinces/getprovinces`),
          fetch(`${API_URL}/api/specialities/getspecialities`),
        ]);

        const [user, instData, provData, specData] = await Promise.all([
          userRes.json(),
          instRes.json(),
          provRes.json(),
          specRes.json(),
        ]);

        // 🔥 primeiro preencher os selects
        setInstitutions(instData);
        setProvinces(Array.isArray(provData) ? provData : provData.data || []);
        setSpecialities(
          Array.isArray(specData) ? specData : specData.data || [],
        );

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
        <form
          /* onSubmit={form.handleSubmit(onSubmit)} */
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl"
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Editar Perfil do Associado
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome */}
            <div>
              <label className="block text-sm">Nome</label>
              <input
                {...form.register("name")}
                className="w-full border rounded-md p-2"
              />
              <p className="text-red-500 text-sm">
                {form.formState.errors.name?.message}
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm">Email</label>
              <input
                {...form.register("email")}
                className="w-full border rounded-md p-2"
              />
              <p className="text-red-500 text-sm">
                {form.formState.errors.email?.message}
              </p>
            </div>

            {/* NIF */}
            <div>
              <label className="block text-sm">NIF</label>
              <input
                {...form.register("nif")}
                className="w-full border rounded-md p-2"
              />
            </div>

            {/* Telemóvel */}
            <div>
              <label className="block text-sm">Telemóvel</label>
              <input
                {...form.register("cellphone")}
                className="w-full border rounded-md p-2"
              />
            </div>

            {/* Role */}
            {/*
            <div>
              <label className="block text-sm">Role</label>
              <input
                {...form.register("role")}
                className="w-full border rounded-md p-2"
              />
            </div>

            {/* Província */}
            <div>
              <label className="block text-sm">Localização</label>
              <select
                {...form.register("provinceId")}
                className="w-full border rounded-md p-2"
              >
                <option value="">Selecionar Localização actual</option>
                {provinces.map((prov: any) => (
                  <option key={prov.id} value={prov.id.toString()}>
                    {prov.provinceName}
                  </option>
                ))}
              </select>
            </div>

            {/* Especialidade */}
            <div>
              <label className="block text-sm">Especialidade</label>
              <select
                {...form.register("specialityId")}
                className="w-full border rounded-md p-2"
              >
                <option value="">Selecionar Especialidade</option>
                {specialities.map((spec: any) => (
                  <option key={spec.id} value={spec.id.toString()}>
                    {spec.specialityName}
                  </option>
                ))}
              </select>
            </div>

            {/* Instituição */}
            <div>
              <label className="block text-sm">Instituição</label>
              <select
                {...form.register("institutionId")}
                className="w-full border rounded-md p-2"
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

          <div className="flex justify-start gap-3 mt-6">
            {/* Guardar */}
            <button
              type="button"
              onClick={() => {
                console.log("button clicked");
                onSubmit(form.getValues());
              }}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
            >
              Guardar Alterações
            </button>

            {/* Cancelar */}
            <button
              type="button"
              onClick={() => router.push(`/users/${id}`)}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
