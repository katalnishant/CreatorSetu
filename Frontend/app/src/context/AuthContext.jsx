import { createContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('creatorSetuUser')
    return storedUser ? JSON.parse(storedUser) : null
  })

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('creatorSetuUser', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('creatorSetuUser')
    }
  }, [currentUser])

  const login = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('creatorSetuUsers') || '[]')
    const user = storedUsers.find((item) => item.email === email && item.password === password)

    if (!user) {
      return { success: false, message: 'Invalid email or password.' }
    }

    setCurrentUser({ id: user.id, name: user.name, email: user.email })
    return { success: true, message: 'Login successful.' }
  }

  const signup = (name, email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('creatorSetuUsers') || '[]')
    const existingUser = storedUsers.find((item) => item.email === email)

    if (existingUser) {
      return { success: false, message: 'An account with this email already exists.' }
    }

    const newUser = { id: Date.now(), name, email, password }
    const updatedUsers = [...storedUsers, newUser]
    localStorage.setItem('creatorSetuUsers', JSON.stringify(updatedUsers))
    setCurrentUser({ id: newUser.id, name: newUser.name, email: newUser.email })
    return { success: true, message: 'Signup successful.' }
  }

  const logout = () => {
    setCurrentUser(null)
  }

  const value = useMemo(
    () => ({ currentUser, login, logout, signup }),
    [currentUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
