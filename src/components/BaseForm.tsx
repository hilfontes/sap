"use client";

import { useForm } from "react-hook-form";

export function BaseForm({ field, label, item, onSubmit }: any) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: item?.[field] || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="block mb-2">{label}</label>

      <input {...register("name")} className="border w-full p-2 mb-4" />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Salvar
      </button>
    </form>
  );
}
