import { useClient } from '~/utils/supabase'
import { z } from 'zod'
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
  return {
    message: 'OK',
    data: {
      username: res.data.user.user_metadata.username,
      email: res.data.user.email,
    },
  }
})
