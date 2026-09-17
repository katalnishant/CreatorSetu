import axios from 'axios'

// Was hardcoded to 'http://127.0.0.1:5000' — that only works when the app
// happens to be running on the same machine as the backend on that exact
// port. VITE_API_URL lets Docker/CI/production point this at wherever the
// backend actually lives, while still defaulting to your original value for
// local `npm run dev` usage.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
