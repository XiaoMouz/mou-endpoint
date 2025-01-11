import { z } from 'zod'
import { auth } from '~/middleware/auth'
import {
  deleteFileInfo,
  getFileInfo,
  setFileInfo,
  setFileRaw,
} from '~/model/file'
import { getRecord } from '~/model/user'
import { ensureFile } from '~/utils/check'
import { getAuthToken, getRandomString } from '~/utils/tools'
import { File as FileInfo } from '~/types/tool-route/file.types'
export default defineEventHandler({
  onRequest: auth,
  handler: async (evt) => {
    const info = await ensureFile(evt)
    const sender = await getAuthToken(evt)
    if (info.uploader !== sender?.email) {
      setResponseStatus(evt, 403)
      return { message: 'Failed', error: 'You not owner' }
    }
    const data = await readFormData(evt).catch((e) => {
      throw createError({ statusCode: 400, message: e.message })
    })

    if (!data)
      throw createError({ statusCode: 400, message: 'Invalid form data' })
    const file = data.get('data')
    if (!file) throw createError({ message: 'No file' })
    const blob = new Blob([file])
    const id = getRandomString('xxxyyy')
    await blob.arrayBuffer().then(async (arrayBuffer) => {
      const buffer = Buffer.from(arrayBuffer)
      await setFileRaw(id, buffer)
    })
    ;(info.mimeType =
      file instanceof File ? file.type : 'application/octet-stream'),
      (info.binaryName = file instanceof File ? file.name : info.title)
    info.modifiedAt = Date.now()
    info.expireAt = Date.now() + 7 * 24 * 60 * 60 * 1000
    info.fileSize = blob.size
    await setFileInfo(id, info)
    return {
      message: 'OK',
      info,
    }
  },
})
