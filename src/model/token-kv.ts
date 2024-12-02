import type { TokenSession } from '~/types/token.type'

import {
  getValue as getTValue,
  setValue as setTValue,
  haveValue as haveTValue,
  deleteValue as deleteTValue,
} from './kv'

export async function getValue(token: string, email: string) {
  const result = await getTValue<TokenSession>(`auth:${token}:${email}`)
  return result
}

export async function setValue(
  token: string,
  email: string,
  value: TokenSession
) {
  await setTValue(`auth:${token}:${email}`, value)
}

export async function haveValue(token: string, email: string) {
  const result = haveTValue(`auth:${token}:${email}`)
  return result
}

export async function deleteValue(token: string, email: string) {
  deleteTValue(`auth:${token}:${email}`)
}

export async function findTokenByEmail(email: string) {
  const storage = useStorage('kv')
  const keys = await storage.getKeys()
  for (let key of keys) {
    if (key.startsWith('auth:') && key.endsWith(email)) {
      const token = await storage.getItem<TokenSession>(key)
      return token
    }
  }
  return null
}
