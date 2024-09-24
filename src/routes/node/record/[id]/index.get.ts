import { getValue } from '~/model/kv'
import { Result } from '~/types/speedtest'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  return (
    (await getValue<Result[]>('test-result'))?.find(
      (result) => result.id === id
    ) || {
      error: 'no data',
    }
  )
})
