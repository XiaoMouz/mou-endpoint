import type { TokenSession } from '~/types/token.type'

import {
  getValue as getTValue,
  setValue as setTValue,
  haveValue as haveTValue,
  deleteValue as deleteTValue,
} from './kv'

export async function getValue(token: string) {
  const result = await getTValue<TokenSession>('auth:' + token)
  return result
}

export async function setValue(token: string, value: TokenSession) {
  await setTValue('auth:' + token, value)
}

export async function haveValue(token: string) {
  const result = haveTValue('auth:' + token)
  return result
}

export async function deleteValue(token: string) {
  deleteTValue('auth:' + token)
}

export async function findTokenByEmail(email: string) {
  const storage = useStorage('kv')
  const keys = await storage.getKeys()
  for (let key of keys) {
    if (key.startsWith('auth:')) {
      const token = await storage.getItem<TokenSession>(key)
      if (
        token &&
        token.user &&
        token.user.email &&
        token.user.email === email
      ) {
        return token
      }
    }
  }
  return null
}
