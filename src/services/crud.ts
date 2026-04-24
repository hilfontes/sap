// services/crud.ts
const API = process.env.NEXT_PUBLIC_FRONTEND_URL;

export async function getAll(endpoint: string) {
  const res = await fetch(`${API}/api/${endpoint}`, { cache: "no-store" });
  return res.json();
}

export async function createItem(endpoint: string, data: any) {
  return fetch(`${API}/api/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateItem(endpoint: string, id: number, data: any) {
  return fetch(`${API}/api/${endpoint}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}