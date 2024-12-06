import { getValue } from '~/model/user'
import { getAuthToken } from '~/utils/tools'

export const auth = defineRequestMiddleware(async (req) => {
  const authorization = await getAuthToken(req)

  if (!authorization) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }
  const session = await getValue(authorization.token, authorization.email)
  if (!session) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }
  if (session?.expireAt < Date.now()) {
    throw createError({
      statusCode: 401,
      message: 'Token expired',
    })
  }
})

export default defineEventHandler((evt) => {})
