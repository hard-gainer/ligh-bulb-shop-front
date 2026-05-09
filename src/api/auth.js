import { API_AUTH } from "./config"

export async function apiLogin(email, password) {
  const res = await fetch(`${API_AUTH}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || "Ошибка входа")
  }
  return res.json()
}

export async function apiRegister(email, password) {
  const res = await fetch(`${API_AUTH}/api/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || "Ошибка регистрации")
  }
  return res.json()
}

export async function apiGetMe(accessToken) {
  const res = await fetch(`${API_AUTH}/api/v1/users/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) throw new Error("Не удалось получить данные пользователя")
  return res.json()
}

export async function apiUpdatePassword(accessToken, password) {
  const res = await fetch(`${API_AUTH}/api/v1/users/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ password }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || "Ошибка смены пароля")
  }
  return res.json()
}

export async function apiRefreshToken(refreshToken) {
  const res = await fetch(`${API_AUTH}/api/v1/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })
  if (!res.ok) throw new Error("Не удалось обновить токен")
  return res.json()
}
