import { haveValue, setValue } from '~/model/kv'

export default defineEventHandler(async (event) => {
  // have force and hash key can reset
  const env = process.env
  const queryKey = getQuery(event)
  if (
    queryKey.force === 'true' &&
    queryKey.hash === env.resetHash &&
    env.resetHash
  ) {
    await setValue('test-result', JSON.stringify([]))
    return {
      message: 'OK',
    }
  }
  if (await haveValue('test-result')) {
    setResponseStatus(event, 409, 'Conflict')
    return {
      message: 'Init already done',
    }
  }

  await setValue('test-result', JSON.stringify([]))
  return {
    message: 'OK',
  }
})
