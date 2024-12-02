import type { StorageValue } from 'unstorage'

export type TokenSession = {
  token: string
  user: string
  refreshToken: string
  expireAt: number
  createdAt: number
}

export type TokenSessionStorageValue = {
  tokenSession: TokenSession
}

// Implement the necessary methods from StorageValue
export const tokenSessionStorageValue: StorageValue<TokenSessionStorageValue> =
  {
    // ... implementation for serialization, deserialization, etc.
  }
