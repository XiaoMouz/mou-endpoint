import { useClient } from '~/utils/supabase'
import { z } from 'zod'
import { getRandomString, setAuthToken } from '~/utils/tools'
import { TokenSession } from '~/types/user.type'
import { deleteValue, getSessionByEmail, setValue } from '~/model/user'
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

  let tokens = await getSessionByEmail(data.email)
  if (tokens.length > 0) {
    for (let token of tokens) {
      await deleteValue(token.token, data.email)
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
    },
  }
  const { data: profile } = await client
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()
  session.user.avatar = profile?.avatar_link || undefined

  await setValue(token, data.email, session)
  setAuthToken(evt, token, data.email)
  return {
    message: 'OK',
    session,
  }
})
