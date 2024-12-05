import type { StorageValue } from 'unstorage'
import { File } from '~/types/tool-route/file.types'
import { UserRecord } from '~/types/user.type'
import { pushFileQueue } from './queue'

const storage = useStorage('blob')
const kv = useStorage('kv')

export async function getFileRaw(key: string) {
  const result = await storage.getItemRaw<StorageValue>(key)
  return result
}

export async function setFileRaw(key: string, value: StorageValue) {
  await storage.setItemRaw(key, value)
}

export async function getFileInfo(key: string) {
  const result = await kv.getItem<File>(`file:${key}`)
  return result
}

export async function setFileInfo(key: string, value: File) {
  await pushFileQueue(key)
  await kv.setItem(`file:${key}`, value)
}
