import type { StorageValue } from 'unstorage'
import { getValue, setValue, haveValue } from './kv'

export async function pushFileQueue(id: string) {
  let queue = await getValue<string[]>('queue:file')
  if (!queue) {
    queue = []
  }
  queue.push(id)
  setValue('queue:file', queue)
}
export async function getFileQueue() {
  const queue = getValue<string[]>('queue:file')
  return queue
}

export async function popFileQueue() {
  const queue = await getValue<string[]>('queue:file')
  if (!queue || queue.length < 1) {
    initQueue('file')
    return
  }

  const id = queue.shift()
  setValue('queue:file', queue)
  return id
}

async function initQueue(key: 'file' | 'copyboard') {
  await setValue(`queue:${key}`, [])
}

export async function pushCopyboardQueue(id: string) {
  let queue = await getValue<string[]>('queue:copyboard')
  if (!queue) {
    queue = []
  }
  queue.push(id)
  setValue('queue:copyboard', queue)
}

export async function getCopyboardQueue() {
  const queue = getValue<string[]>('queue:copyboard')
  return queue
}

export async function popCopyboardQueue() {
  const queue = await getValue<string[]>('queue:copyboard')
  if (!queue || queue.length < 1) {
    initQueue('copyboard')
    return
  }

  const id = queue.shift()
  setValue('queue:copyboard', queue)
  return id
}
