import { createContext, useEffect, useState } from 'react'
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import { signInRequest, getUserInfo } from '../services/auth'

export const AUTH_TOKEN_NAME = '@Library:token'

interface User {
  name: string
  email: string
  avatar: string
}

interface SignInInput {
  email: string
  password: string
}

interface AuthContextType {
  isAuth: boolean
  user: User
  signIn: (input: SignInInput) => Promise<void>
  AUTH_TOKEN_NAME
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const isAuth = !!user

  useEffect(() => {
    const { [AUTH_TOKEN_NAME]: token } = parseCookies()

    if (!token) {
      Router.push('/')
    }

    getUserInfo().then(({ user }) => setUser(user))
  }, [])

  const signIn = async ({ email, password }: SignInInput) => {
    const { token, user } = signInRequest({ email, password })

    setCookie(undefined, AUTH_TOKEN_NAME, token, {
      maxAge: 60 * 60 * 24 // 24 hours
    })

    setUser(user)

    Router.push('/books')
  }

  return (
    <AuthContext.Provider value={{ isAuth, user, signIn, AUTH_TOKEN_NAME }}>
      {children}
    </AuthContext.Provider>
  )
}
