import { useClient } from '~/utils/supabase'
import { z } from 'zod'
import { getRandomString, setAuthToken } from '~/utils/tools'
import { TokenSession } from '~/types/user.type'
import {
  getRecord,
  getSessionByEmail,
  initRecord,
  setValue,
} from '~/model/user'

export default defineEventHandler(async (evt) => {
  let body
  try {
    const obj = z.object({
      email: z.string(),
      password: z.string(),
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

  const client = useClient()
  const res = await client.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })
  if (res.error) {
    setResponseStatus(evt, res.error.status)
    return {
      message: 'Failed',
      error: res.error.message,
    }
  }

  let origin = await getSessionByEmail(data.email)
  if (origin) {
    origin.expireAt = 30 * 24 * 60 * 60 * 1000 + Date.now()
    await setValue(origin.token, data.email, origin)
    return {
      message: 'OK',
      session: origin,
    }
  }

  const token = getRandomString('xxxxyyxxxyxxyx')
  const refreshToken = getRandomString('xyxxyyyyxxyx')
  const session: TokenSession = {
    token,
    refreshToken,
    expireAt: 30 * 24 * 60 * 60 * 1000 + Date.now(),
    createdAt: Date.now(),
    user: {
      id: res.data.user.id,
      username: res.data.user.user_metadata.username,
      email: res.data.user.user_metadata.email,
      avatar: res.data.user.user_metadata.avatar_url,
    },
  }

  await setValue(token, data.email, session)
  setAuthToken(evt, token, data.email)
  if (!(await getRecord(data.email))) {
    initRecord(
      data.email,
      res.data.user.user_metadata.username,
      res.data.user.user_metadata.avatar_url
    )
  }
  return {
    message: 'OK',
    session,
  }
})
