"use client";

import { useEffect, useState } from "react";
import { adminConfig } from "@/config/adminConfig";
import { getAll, createItem, updateItem } from "@/services/crud";
import { DataTable } from "@/components/DataTable";
import { Modal } from "@/components/Modal";
import { BaseForm } from "@/components/BaseForm";
import { NavbarLogin } from "@/components/navbarlogin";

export default function AdminPage() {
  const [active, setActive] = useState("institutions");
  const [data, setData] = useState<any[]>([]);
  const [modal, setModal] = useState({ open: false, item: null });

  const config = adminConfig[active as keyof typeof adminConfig];

  useEffect(() => {
    load();
  }, [active]);

  async function load() {
    const res = await getAll(config.endpoint);
    setData(res);
  }

  function openNew() {
    setModal({ open: true, item: null });
  }

  function openEdit(item: any) {
    setModal({ open: true, item });
  }

  async function handleSubmit(values: any) {
    const payload = {
      [config.field]: values.name,
    };

    if (modal.item) {
      await updateItem(config.endpoint, modal.item.id, payload);
    } else {
      await createItem(config.endpoint, payload);
    }

    setModal({ open: false, item: null });
    load();
  }

  return (
    <>
      <NavbarLogin />

      <div className="p-6 pt-20">
        {/* 🔝 BOTÕES */}
        <div className="flex gap-4 mb-6">
          {Object.keys(adminConfig).map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`px-4 py-2 rounded-full  ${
                active === key ? "bg-green-200 text-black" : "bg-gray-200"
              }`}
            >
              {adminConfig[key as keyof typeof adminConfig].label}
            </button>
          ))}
        </div>

        {/* ➕ BOTÃO NOVO */}
        <button
          onClick={openNew}
          className="bg-green-600 text-white px-4 py-2 rounded mb-2"
        >
          + Nova {config.label}
        </button>

        {/* 📊 TABELA */}
        <div className="w-1/2">
          <DataTable data={data} field={config.field} onEdit={openEdit} />
        </div>
        {/* 🪟 MODAL */}
        <Modal
          open={modal.open}
          onClose={() => setModal({ open: false, item: null })}
        >
          <BaseForm
            field={config.field}
            label={config.label}
            item={modal.item}
            onSubmit={handleSubmit}
          />
        </Modal>
      </div>
    </>
  );
}
