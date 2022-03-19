import { v4 as uuid } from 'uuid'

interface signInRequestData {
  email: string
  password: string
}

export const signInRequest = (data: signInRequestData) => {
  return {
    token: uuid(),
    user: {
      name: 'Adauto',
      email: 'adautovjr@yahoo.com',
      avatar: 'https://github.com/adautovjr.png'
    }
  }
}

export const getUserInfo = async () => {
  return {
    user: {
      name: 'Adauto',
      email: 'adautovjr@yahoo.com',
      avatar: 'https://github.com/adautovjr.png'
    }
  }
}