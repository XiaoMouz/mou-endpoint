import type { StorageValue } from 'unstorage'

export async function getPasteBoardValue<T extends StorageValue>(key: string) {
  const storage = useStorage('kv')
  const result = await storage.getItem<T>('paste:' + key)
  return result
}
export async function setPasteBoardValue<T extends StorageValue>(
  key: string,
  value: T
) {
  const storage = useStorage('kv')
  await storage.setItem('paste:' + key, value)
}

export async function havePasteBoardValue(key: string) {
  const storage = useStorage('kv')
  const result = await storage.hasItem('paste:' + key)
  return result
}
