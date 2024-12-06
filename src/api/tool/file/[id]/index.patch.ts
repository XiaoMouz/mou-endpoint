import { z } from 'zod'
import { auth } from '~/middleware/auth'
import { deleteFileInfo, getFileInfo, setFileInfo } from '~/model/file'
import { getRecord } from '~/model/user'
import { ensureFile } from '~/utils/check'
import { getAuthToken } from '~/utils/tools'
import { File } from '~/types/tool-route/file.types'
export default defineEventHandler({
  onRequest: auth,
  handler: async (evt) => {
    const info = await ensureFile(evt)
    const sender = getAuthToken(evt)
    if (info.uploader !== sender?.email) {
      setResponseStatus(evt, 403)
      return { message: 'Failed', error: 'You not owner' }
    }
    let body
    try {
      const obj = z.object({
        title: z.string().optional(),
        delay: z.boolean().optional(),
        status: z.enum(['active', 'frozen']).optional(),
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
    if (data.title) info.title = data.title
    if (data.status) info.status = data.status
    if (data.private) info.private = data.private
    if (data.password) info.password = data.password
    if (data.description) info.description = data.description
    if (data.delay) info.expireAt = Date.now() + 7 * 24 * 60 * 60 * 1000
    info.modifiedAt = Date.now()
    await setFileInfo(info.id, info)
    return {
      message: 'OK',
      info,
    }
  },
})
