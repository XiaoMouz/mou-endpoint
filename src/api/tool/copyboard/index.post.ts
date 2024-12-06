import { z } from 'zod'
import { setCopyboard } from '~/model/copyboard'
import { Content } from '~/types/tool-route/copyboard.type'
import { getAuthToken, getRandomString } from '~/utils/tools'

export default defineEventHandler(async (evt) => {
  const obj = z.object({
    name: z
      .string()
      .optional()
      .default(`PublicCopyboard-${Date.now().toLocaleString()}`),
    content: z.string(),
    private: z.boolean().optional().default(false),
    password: z.string().optional(),
  })
  const identity = await getAuthToken(evt)
  let body
  try {
    body = await readValidatedBody(evt, obj.safeParse)
  } catch (e) {
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
  const id = getRandomString('xxxyyx')
  let content: Content = {
    id,
    uploader: identity ? identity.email : 'anonymous',
    createdAt: Date.now(),
    name: data.name,
    modifiedAt: Date.now(),
    expireAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
    content: data.content,
    status: 'active',
    private: identity ? data.private : false,
    password: data.password,
    history: [],
  }
  await setCopyboard(id, content)
  return {
    message: 'OK',
    info: content,
  }
})
