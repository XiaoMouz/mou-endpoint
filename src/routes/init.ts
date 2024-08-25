import { haveValue, setValue } from '~/model/kv'

export default defineEventHandler(async (event) => {
  // have force and hash key can reset
  const queryKey = getQuery(event)
  if (queryKey.force === 'true' && queryKey.hash === 'hash') {
    await setValue('test-result', JSON.stringify([]))
    return {
      message: 'OK',
    }
  }
  if (await haveValue('test-result')) {
    return {
      message: 'Init already done',
    }
  }

  await setValue('test-result', JSON.stringify([]))
  return {
    message: 'OK',
  }
})
