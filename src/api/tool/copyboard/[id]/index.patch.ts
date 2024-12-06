import { z } from 'zod'
import { setCopyboard } from '~/model/copyboard'
import { ensureCopyboard } from '~/utils/check'
import { getAuthToken } from '~/utils/tools'

export default defineEventHandler(async (evt) => {
  const info = await ensureCopyboard(evt)
  const sender = await getAuthToken(evt)
  if (info.uploader !== 'anonymous' && info.uploader !== sender?.email) {
    setResponseStatus(evt, 403)
    return { message: 'Failed', error: 'You not owner' }
  }
  let body
  try {
    const obj = z.object({
      name: z.string().optional(),
      delay: z.boolean().optional(),
      status: z.enum(['active', 'frozen']).optional(),
      content: z.string().optional(),
      private: z.boolean().optional(),
      password: z.string().optional(),
      description: z.string().optional(),
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
  if (data.name) info.name = data.name
  if (data.delay) info.expireAt = Date.now() + 14 * 24 * 60 * 60 * 1000
  if (data.status) info.status = data.status
  if (data.private) info.private = data.private
  if (data.password) info.password = data.password
  if (data.content) {
    info.history.push({
      content: info.content,
      contentTime: Date.now(),
    })
    info.content = data.content
  }
  info.modifiedAt = Date.now()
  await setCopyboard(info.id, info)
  return {
    message: 'OK',
    info,
  }
})
