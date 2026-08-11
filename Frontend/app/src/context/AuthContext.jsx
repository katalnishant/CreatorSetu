import { createContext, useEffect, useMemo, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('creatorSetuUser')
    return storedUser ? JSON.parse(storedUser) : null
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('creatorSetuUser', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('creatorSetuUser')
    }
  }, [currentUser])

  const login = async (email, password) => {
    try {
      setLoading(true)
      const response = await api.post('/api/auth/login', { email, password })
      const { token, user } = response.data

      localStorage.setItem('token', token)
      setCurrentUser(user)
      return { success: true, message: 'Login successful.' }
    } catch (error) {
      const message = error?.response?.data?.message || 'Login failed.'
      return { success: false, message }
    } finally {
      setLoading(false)
    }
  }

  const signup = async (name, email, password) => {
    try {
      setLoading(true)
      const response = await api.post('/api/auth/register', { name, email, password })
      return { success: true, message: response.data.message || 'Signup successful.' }
    } catch (error) {
      const message = error?.response?.data?.message || 'Signup failed.'
      return { success: false, message }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('creatorSetuUser')
    setCurrentUser(null)
  }

  const value = useMemo(
    () => ({ currentUser, loading, login, logout, signup }),
    [currentUser, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
