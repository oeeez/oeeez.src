import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = 
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      // Handle token refresh or logout logic here
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = 
  localStorage.setItem('token', token)
}

export const removeAuthToken = () => {
  delete api.defaults.headers.common['Authorization']
  localStorage.removeItem('token')
}
