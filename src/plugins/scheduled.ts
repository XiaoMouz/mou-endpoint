import { getValue, setValue } from '~/model/kv'
import { type Database, type Tables } from '~/types/database.types'
import { type Node } from '~/types/node'
import { type Result } from '~/types/speedtest'
import { testNode } from '~/utils/network'
import { useClient } from '~/utils/supabase'

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('cloudflare:scheduled', async (evt) => {
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
  })
})
