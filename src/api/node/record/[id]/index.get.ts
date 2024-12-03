import { getValue } from '~/model/kv'
import { Result } from '~/types/speedtest'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const data = (await getValue<Result[]>('test-result'))?.find(
    (result) => result.id === id
  )
  if (!data) {
    setResponseStatus(event, 404, 'Not Found')
    return {
      message: 'Failed',
      error: 'No data available - empty result',
    }
  }
  return {
    message: 'OK',
    data: data,
  }
})
