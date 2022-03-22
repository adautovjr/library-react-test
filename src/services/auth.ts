import { v4 as uuid } from 'uuid'

import { SignInRequestData } from '../data/types'

export const signInRequest = (data: SignInRequestData) => {
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