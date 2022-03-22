import { setCookie } from 'nookies'
import { BOOKS_JSON } from '../data/types'

export const writeToFile = (data: string) => {
  setCookie(undefined, BOOKS_JSON, data, {
    maxAge: 60 * 60 * 24 // 24 hours
  })
}