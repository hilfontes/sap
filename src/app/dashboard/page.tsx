"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import KpiCard from "@/components/dashboard/KpiCard";
import StatsCards from "@/components/StatsCards";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    axios
      .get(`${API_URL}/dashboard/stats`)
      .then((res) => setData(res.data))
      .catch(console.error);
  }, []);

  if (!data) return <p className="p-6">Carregando...</p>;

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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">📊 Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral dos dados da plataforma
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Associados Situação Financeira Regularizada"
          value={data.paidAllCount}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card className="border-l-4 border-blue-500">
          <CardHeader>
            <CardTitle>Top Nacionalidades</CardTitle>
          </CardHeader>
          <CardContent>
            <StatsCards data={nationalityData} color="#3b82f6" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Províncias</CardTitle>
          </CardHeader>
          <CardContent>
            <StatsCards data={provinceData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Especialidades</CardTitle>
          </CardHeader>
          <CardContent>
            <StatsCards data={specialityData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
