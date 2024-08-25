import { createClient } from '@supabase/supabase-js'
import { getValue, setValue } from '~/model/kv'
import { type Database, type Tables } from '~/types/database.types'
import { type Node } from '~/types/node'
import { type Result } from '~/types/speedtest'
import { testNode } from '~/utils/network'

export default defineEventHandler(async (event) => {
  const env = process.env
  if (!env.SUPABASE_URL || !env.SUPABASE_KEY) {
    return {
      message: 'Failed',
      error: 'Missing SUPABASE_URL or SUPABASE_KEY',
    }
  }
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY)
  const { data } = await supabase
    .from('datasources')
    .select('*')
    .eq('id', 1)
    .returns<Tables<'datasources'>[]>()
  if (!data) {
    return {
      message: 'Failed',
      error: 'No data available - empty db result',
    }
  }

  let content: Array<Node> = []
  if (data && data.length > 0 && data[0].content) {
    content = JSON.parse(JSON.stringify(data[0].content))
  }
  if (content.length === 0) {
    return {
      message: 'Failed',
      error: 'No content available - empty array',
    }
  }

  let resData = (await getValue<Result[]>('test-result')) || []
  for (const node of content) {
    let result = await testNode(node)
    let index = resData.findIndex((item: Result) => item.id === node.id)
    if (index === -1) {
      resData.push({
        id: node.id,
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
  setValue('test-result', JSON.stringify(resData))
  return {
    message: 'OK - Scheduled',
    data: resData,
  }
})
