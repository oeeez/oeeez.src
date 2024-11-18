import { useState, useEffect } from 'react'
import { api } from '../services/api'

interface User {
  id: string
  username: string
  email: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/auth/me')
        setUser(response.data)
      } catch (error) {
        console.error('Authentication error:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      setUser(response.data.user)
      return response.data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return { user, loading, login, logout }
}
