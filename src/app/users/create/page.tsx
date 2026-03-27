"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

// ✅ schema validação
const schema = z.object({
  name: z.string().min(3, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(3, "Mínimo 3 caracteres"),
  provinceId: z.string().min(1, "Selecione a província"),
  institutionId: z.string().min(1, "Selecione a instituição"),
  location: z.string().min(3, "Endereço obrigatório"),
  role: z.enum(["ASSOCIATE", "ADMIN"]).default("ASSOCIATE"),
});

type FormData = z.infer<typeof schema>;

export default function CreateUserPage() {
  const router = useRouter();

  const [provinces, setProvinces] = useState([]);
  const [institutions, setInstitutions] = useState([]);

  // 🔥 react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // 🔄 carregar dados
  useEffect(() => {
    fetch(`${API_URL}/api/provinces/getprovinces`)
      .then((res) => res.json())
      .then(setProvinces);

    fetch(`${API_URL}/api/institutions/getinstitutions`)
      .then((res) => res.json())
      .then(setInstitutions);
  }, []);

  // 🚀 submit
  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          provinceId: Number(data.provinceId),
          institutionId: Number(data.institutionId),
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Toaster position="top-right" />

      {/* 💳 CARD */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Novo Associado
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nome */}
          <div>
            <input
              placeholder="Nome"
              {...register("name")}
              className="w-full border p-2 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Endereço */}
          <div>
            <input
              placeholder="Endereço"
              {...register("location")}
              className="w-full border p-2 rounded-md"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <input
              placeholder="Role"
              {...register("role")}
              className="w-full border p-2 rounded-md"
            />
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              placeholder="Email"
              {...register("email")}
              className="w-full border p-2 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Senha"
              {...register("password")}
              className="w-full border p-2 rounded-md"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Provincia */}
          <div>
            <select
              {...register("provinceId")}
              className="w-full border rounded-md p-2"
            >
              <option value="">Selecionar Localização actual</option>
              {provinces.map((prov: any) => (
                <option key={prov.id} value={prov.id.toString()}>
                  {prov.provinceName}
                </option>
              ))}
            </select>
            {errors.provinceId && (
              <p className="text-red-500 text-sm">
                {errors.provinceId.message}
              </p>
            )}
          </div>

          {/* Instituição */}
          <div>
            <select
              {...register("institutionId")}
              className="w-full border rounded-md p-2"
            >
              <option value="">Selecionar instituição</option>
              {institutions.map((inst: any) => (
                <option key={inst.id} value={inst.id.toString()}>
                  {inst.institutionName}
                </option>
              ))}
            </select>
            {errors.institutionId && (
              <p className="text-red-500 text-sm">
                {errors.institutionId.message}
              </p>
            )}
          </div>

          {/* Botões */}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              {isSubmitting ? "A criar..." : "Criar"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/users")}
              className="flex-1 border p-2 rounded-md"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
