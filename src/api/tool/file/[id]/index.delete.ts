import { auth } from '~/middleware/auth'
import { deleteFileInfo, getFileInfo } from '~/model/file'
import { getRecord } from '~/model/user'
import { ensureFile } from '~/utils/check'
import { getAuthToken } from '~/utils/tools'

export default defineEventHandler({
  onRequest: auth,
  handler: async (evt) => {
    const info = await ensureFile(evt)
    const sender = await getAuthToken(evt)
    if (info.uploader !== sender?.email) {
      setResponseStatus(evt, 403)
      return { message: 'Failed', error: 'You not owner' }
    }
    await deleteFileInfo(info.id)
    return {
      message: 'OK',
      info,
    }
  },
})
