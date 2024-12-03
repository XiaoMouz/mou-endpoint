import type { StorageValue } from 'unstorage'
import type { Content } from '~/types/tool-route/copyboard.type'
import { getValue, setValue, haveValue } from './kv'

export async function getPasteBoardValue(key: string) {
  const result = await getValue<Content>('paste:' + key)
  return result
}
export async function setPasteBoardValue(key: string, value: Content) {
  await setValue('paste:' + key, value)
}

export async function havePasteBoardValue(key: string) {
  const result = await haveValue('paste:' + key)
  return result
}
