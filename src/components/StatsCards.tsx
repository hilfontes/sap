"use client";

export default function StatsCards({ title, data }: any) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ marginBottom: 16 }}>{title}</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        {data.map((item: any, index: number) => (
          <div
            key={index}
            style={{
              background: "#ffffff",
              padding: 20,
              borderRadius: 12,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              border: "1px solid #eee",
            }}
          >
            <p style={{ fontWeight: 600, marginBottom: 8 }}>{item.name}</p>

            <h1 style={{ fontSize: 28, color: "#4f46e5" }}>{item.value}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
