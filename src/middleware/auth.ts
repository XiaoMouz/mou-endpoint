import { getAuthToken } from '~/utils/tools'

export const auth = defineRequestMiddleware((req) => {
  const authorization = getAuthToken(req)
  if (!authorization) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }
})

export default defineEventHandler(async (evt) => {})
