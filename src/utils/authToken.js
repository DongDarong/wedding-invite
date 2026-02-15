const TOKEN_KEY = 'admin_auth_token'

export function getAuthToken() {
  return sessionStorage.getItem(TOKEN_KEY)
}

export function setAuthToken(token) {
  if (!token) return
  sessionStorage.setItem(TOKEN_KEY, token)
}

export function clearAuthToken() {
  sessionStorage.removeItem(TOKEN_KEY)
}

export async function syncAuthToken(user) {
  if (!user) {
    clearAuthToken()
    return null
  }

  const token = await user.getIdToken()
  setAuthToken(token)
  return token
}
