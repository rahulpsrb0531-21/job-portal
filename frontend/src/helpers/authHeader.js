export function authHeader() {
  // return authorization header with jwt token
  const token = localStorage.getItem('token')
  if (token) {
    return `Bearer ${token}`
  }
}