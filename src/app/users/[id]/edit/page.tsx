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
});

type FormData = z.infer<typeof userSchema>;

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function EditUserPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [institutions, setInstitutions] = useState([]);
  const [provinces, setProvinces] = useState([]);

  const form = useForm<FormData>({
    resolver: zodResolver(userSchema),
  });

  // 🔹 carregar utilizador
  useEffect(() => {
    async function loadUser() {
      const res = await fetch(`http://localhost:3001/api/auth/users/${id}`);

      const data = await res.json();
      console.log("Utilizador carregado:", data);
      form.reset({
        name: data.name,
        email: data.email,
        location: data.location,
        address: data.address,
        institutionId: data.institutionId?.toString(),
        nif: data.nif,
        cellphone: data.cellphone,
        provinceId: data.provinceId,
      });
    }

    loadUser();
  }, [id]);

  // 🔹 carregar instituições
  useEffect(() => {
    async function loadInstitutions() {
      const res = await fetch(
        "http://localhost:3001/api/institutions/getinstitutions",
      );

      const data = await res.json();
      setInstitutions(data);
      console.log("Instituições carregadas:", data);
    }

    loadInstitutions();
  }, []);

  // 🔹 carregar províncias
  useEffect(() => {
    async function loadProvinces() {
      const res = await fetch(
        "http://localhost:3001/api/provinces/getprovinces",
      );

      const data = await res.json();
      setProvinces(Array.isArray(data) ? data : data.data || []);
      console.log("Províncias carregadas:", data);
    }

    loadProvinces();
  }, []);

  const onSubmit = async (data: FormData) => {
    const res = await fetch(`http://localhost:3001/api/auth/users/${id}`, {
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
      }),
    });

    if (res.ok) {
      alert("Utilizador atualizado!");
      router.push(`/users/${id}`);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-10">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
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
              type="submit"
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
