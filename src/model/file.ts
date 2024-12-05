import type { StorageValue } from 'unstorage'
import { UserRecord } from '~/types/user.type'

const storage = useStorage('blob')

export async function getFileRaw(key: string) {
  const result = await storage.getItemRaw<StorageValue>(key)
  return result
}

export async function setFileRaw(key: string, value: StorageValue) {
  await storage.setItemRaw(key, value)
}
