import type { StorageValue } from 'unstorage'
import type { Content } from '~/types/tool-route/copyboard.type'
import { getValue, setValue, haveValue } from './kv'
import { pushCopyboardQueue } from './queue'
import { getRecord, setRecord } from './user'

export async function getCopyboard(key: string) {
  const result = await getValue<Content>('paste:' + key)
  return result
}
export async function setCopyboard(key: string, value: Content) {
  await getRecord(value.uploader).then(async (record) => {
    if (!record) {
      return
    }
    record.copyboards.push(value)
    await setRecord(value.uploader, record)
  })
  await pushCopyboardQueue(key)
  await setValue('paste:' + key, value)
}

export async function deleteCopyboard(key: string) {
  const info = await getCopyboard(key)
  if (!info) {
    return
  }
  await getRecord(info.uploader).then(async (record) => {
    if (!record) {
      return
    }
    record.copyboards = record.copyboards.filter((file) => file.id !== key)
    await setRecord(info.uploader, record)
  })

  await setValue('paste:' + key, null)
}

export async function haveCopyboard(key: string) {
  const result = await haveValue('paste:' + key)
  return result
}
