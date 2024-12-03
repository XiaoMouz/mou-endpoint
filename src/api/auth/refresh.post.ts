import { useClient } from '~/utils/supabase'
import { z } from 'zod'
import { getRandomString, setAuthToken } from '~/utils/tools'
import { TokenSession } from '~/types/user.type'
import { getSessionByToken, getValue, setValue } from '~/model/user'
export default defineEventHandler(async (evt) => {
  let body
  try {
    const obj = z.object({
      token: z.string(),
      email: z.string().optional(),
      refreshToken: z.string(),
    })
    body = await readValidatedBody(evt, obj.safeParse)
  } catch {
    setResponseStatus(evt, 400)
    return {
      message: 'Failed',
      error: 'Invalid Body',
    }
  }
  const { data, error } = body

  if (error) {
    setResponseStatus(evt, 400)
    return {
      message: 'Failed',
      error: error.errors,
    }
  }
  let session

  if (data.email) {
    session = await getValue(data.token, data.email)
  } else {
    session = await getSessionByToken(data.token)
  }

  if (!session) {
    setResponseStatus(evt, 401)
    return {
      message: 'Failed',
      error: 'Invalid Token',
    }
  }

  if (session.refreshToken !== data.refreshToken) {
    setResponseStatus(evt, 401)
    return {
      message: 'Failed',
      error: 'Invalid Refresh Token',
    }
  }

  if (session.expireAt < Date.now()) {
    setResponseStatus(evt, 401)
    return {
      message: 'Failed',
      error: 'Token Expired',
    }
  }

  session.expireAt = 30 * 24 * 60 * 60 * 1000 + Date.now()
  session.refreshToken = getRandomString('xyxxyyyyxxyx')

  await setValue(session.token, session.user.email, session)
  setAuthToken(evt, session.token, session.user.email)
  return {
    message: 'OK',
    session,
  }
})
