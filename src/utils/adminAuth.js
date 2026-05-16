const COOKIE_NAME = "admin_access_token"
// 8 hours
const MAX_AGE = 60 * 60 * 8

export function setAdminToken(token) {
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(token)}; path=/; max-age=${MAX_AGE}; SameSite=Strict`
}

export function getAdminToken() {
  for (const raw of document.cookie.split(";")) {
    const [name, ...rest] = raw.trim().split("=")
    if (name === COOKIE_NAME) return decodeURIComponent(rest.join("="))
  }
  return null
}

export function clearAdminToken() {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`
}
