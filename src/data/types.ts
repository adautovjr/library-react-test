export const AUTH_TOKEN_NAME = '@Library:token'
export const BOOKS_JSON = '@Library:books:storage'

export interface Book {
  id: string
  name: string
  image: string
  loaned: boolean
}

export interface MenuOption {
  name: string
  current: boolean
  handleClick: (data: any) => void
}

export interface User {
  name: string
  email: string
  avatar: string
}

export interface SignInInput {
  email: string
  password: string
}

export interface AuthContextType {
  isAuth: boolean
  user: User
  signIn: (input: SignInInput) => Promise<void>
  AUTH_TOKEN_NAME
}

export interface SignInRequestData {
  email: string
  password: string
}

export interface GetBooksInput {
  search?: string
}

export interface CreateBookInput {
  name: string
  image: string
}

export interface EditBookInput {
  bookID: string
  name?: string
  image?: string
  loaned?: boolean
}

export interface DeleteBookInput {
  bookID: string
}