import { getValue } from '~/model/kv'

export default defineEventHandler(async (event) => {
  const data = await getValue('test-result')
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
