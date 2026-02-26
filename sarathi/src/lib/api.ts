import axios from 'axios'

export const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('sarathi-store')
  if (stored) {
    try {
      const state = JSON.parse(stored)
      if (state?.state?.user?.id) {
        config.headers['X-User-Id'] = state.state.user.id
        config.headers['X-User-Role'] = state.state.user.role
      }
    } catch {
      // ignore parse errors
    }
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.code === 'ERR_NETWORK') {
      console.warn('[Sarathi] Network error — offline mode may be active')
    }
    return Promise.reject(err)
  }
)
