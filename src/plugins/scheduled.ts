import { get } from 'http'
import { deleteFileInfo, getFileInfo } from '~/model/file'
import { getValue, setValue } from '~/model/kv'
import { type Database, type Tables } from '~/types/database.types'
import { type Node } from '~/types/node'
import { type Result } from '~/types/speedtest'
import { testNode } from '~/utils/network'
import { useClient } from '~/utils/supabase'

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('cloudflare:scheduled', async (evt) => {
    speedtest()
  })
})

const speedtest = async () => {
  const client = useClient()
  const { data } = await client
    .from('datasources')
    .select('*')
    .eq('state', 'enable')
    .eq('type', 'net-node')
    .returns<Tables<'datasources'>[]>()
  if (!data) {
    return
  }
  let content: Array<Node> = []
  if (data && data.length > 0 && data[0].content) {
    content = JSON.parse(JSON.stringify(data[0].content))
  }
  if (content.length === 0) {
    return
  }
  let resData = (await getValue<Result[]>('test-result')) || []
  for (const node of content) {
    let result = await testNode(node)
    let index = resData.findIndex(
      (item: Result) => item.id === node.id.toString()
    )
    if (index === -1) {
      resData.push({
        id: node.id.toString(),
        info: node,
        results: [result],
      })
      continue
    }
    if (resData[index].results.length >= 24) {
      resData[index].results.shift()
    }
    resData[index].results.push(result)
  }
  await setValue('test-result', JSON.stringify(resData))
  console.log('Scheduled task done:' + Date.now().toLocaleString())
}

const checkQueue = async () => {
  const queue = await getValue<string[]>('queue:file')
  if (!queue || queue.length === 0) {
    return
  }
  const _checkFile = async (k: string) => {
    getFileInfo(k).then((file) => {
      if (!file) {
        return
      }
      const now = Date.now()
      if (file.expireAt < now) {
        deleteFileInfo(k)
      }
    })
  }
  const id = queue.shift()
  if (id) {
  }

  return id
}
