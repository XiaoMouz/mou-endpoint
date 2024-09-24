import { getValue } from '~/model/kv'

export default defineEventHandler(async (event) => {
  return (
    (await getValue('test-result')) || {
      error: 'no data',
    }
  )
})
