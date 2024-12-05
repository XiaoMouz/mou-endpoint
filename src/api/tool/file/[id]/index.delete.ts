import { auth } from '~/middleware/auth'
import { deleteFileInfo, getFileInfo } from '~/model/file'
import { getRecord } from '~/model/user'
import { getAuthToken } from '~/utils/tools'

export default defineEventHandler({
  onRequest: auth,
  handler: async (evt) => {
    const id = getRouterParam(evt, 'id')
    if (!id) {
      setResponseStatus(evt, 400)
      return { message: 'Failed', error: 'Invalid ID' }
    }
    const info = await getFileInfo(id)
    if (!info) {
      setResponseStatus(evt, 404)
      return { message: 'Failed', error: 'Not Found' }
    }
    if (info.expireAt < Date.now()) {
      deleteFileInfo(id)
      setResponseStatus(evt, 404)
      return { message: 'Failed', error: 'Not Found' }
    }
    if (info.status !== 'active') {
      setResponseStatus(evt, 403)
      return { message: 'Failed', error: 'File is not active' }
    }
    const sender = getAuthToken(evt)
    if (info.uploader !== sender?.email) {
      setResponseStatus(evt, 403)
      return { message: 'Failed', error: 'You not owner' }
    }
    await deleteFileInfo(id)
    return {
      message: 'OK',
      info,
    }
  },
})
