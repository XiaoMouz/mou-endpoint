import type { StorageValue } from 'unstorage'
import { File } from '~/types/tool-route/file.types'
import { UserRecord } from '~/types/user.type'
import { pushFileQueue } from './queue'
import { getRecord, setRecord } from './user'

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
  await getRecord(value.uploader).then(async (record) => {
    if (!record) {
      return
    }
    record.files.push(value)
    await setRecord(value.uploader, record)
  })
  await pushFileQueue(key)
  await kv.setItem(`file:${key}`, value)
}

export async function deleteFileInfo(key: string) {
  const info = await getFileInfo(key)
  if (!info) {
    return
  }
  await getRecord(info.uploader).then(async (record) => {
    if (!record) {
      return
    }
    record.files = record.files.filter((file) => file.id !== key)
    await setRecord(info.uploader, record)
  })
  await storage.removeItem(key)
  await kv.removeItem(`file:${key}`)
}
