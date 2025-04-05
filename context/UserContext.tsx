// 📁 context/UserContext.tsx
'use client'
import { createContext, useContext, useState, useEffect } from 'react'

export type User = {
  id: string
  name: string
  email: string
  role: 'USER' | 'DOCTOR' | 'ADMIN'
}

const UserContext = createContext<{
  user: User | null
  setUser: (user: User | null) => void
}>({ user: null, setUser: () => {} })

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
