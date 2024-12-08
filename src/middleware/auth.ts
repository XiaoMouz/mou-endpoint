import { getAuthToken } from '~/utils/tools'

export const auth = defineRequestMiddleware(async (req) => {
  const authorization = await getAuthToken(req)

  if (!authorization) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }
})

export default defineEventHandler((evt) => {})
