const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginRequest(data: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function changePasswordRequest(password: string, token?: string) {
  const res = await fetch(`${BASE_URL}/auth/change-password`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify({ password }),
  });

  return res.json();
}