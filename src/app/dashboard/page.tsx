"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import StatsCards from "../../components/StatsCards";
import { env } from "process";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    axios
      //.get("http://localhost:3000/dashboard/stats")
      .get(`${API_URL}/dashboard/stats`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <p>Loading...</p>;

  // 🔹 Formatar dados
  const nationalityData = data.usersByNationality.map((item: any) => ({
    name: item.nationalityName,
    value: item._count.user,
  }));

  const provinceData = data.usersByProvince.map((item: any) => ({
    name: item.provinceName,
    value: item._count.user,
  }));

  const specialityData = data.usersBySpeciality.map((item: any) => ({
    name: item.specialityName,
    value: item._count.user,
  }));

  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ marginBottom: 30 }}>📊 Dashboard</h1>
      {/* KPI */}
      <div
        style={{
          marginTop: 40,
          padding: 20,
          background: "#4CAF50",
          color: "#fff",
          borderRadius: 12,
          width: 250,
        }}
      >
        <p>Sit. Financeira Regularizada</p>
        <h1 style={{ fontSize: 32 }}>{data.paidAllCount}</h1>
      </div>
      <StatsCards title="Top 5 Nacionalidades" data={nationalityData} />

      <StatsCards title="Top 5 Províncias" data={provinceData} />

      <StatsCards title="Top 5 Especialidades" data={specialityData} />
    </div>
  );
}
