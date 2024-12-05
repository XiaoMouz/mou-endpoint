import { deleteFileInfo, getFileInfo } from '~/model/file'
import { getRecord } from '~/model/user'
import { ensureFile } from '~/utils/check'
import { getAuthToken } from '~/utils/tools'

export default defineEventHandler(async (evt) => {
  const info = await ensureFile(evt)

  if (info.password) {
    const body = await readBody(evt)
    if (!body || !body.password || body.password !== info.password) {
      setResponseStatus(evt, 403)
      return {
        message: 'Failed',
        error: 'Password require or is wrong',
      }
    }
  }
  const owner = await getRecord(info.uploader)
  if (info.private) {
    const auth = getAuthToken(evt)
    if (!auth) {
      setResponseStatus(evt, 401)
      return { message: 'Failed', error: 'Need login' }
    }
    if (auth.email !== info.uploader) {
      setResponseStatus(evt, 403)
      return { message: 'Failed', error: 'You not access permission' }
    }
    return {
      message: 'OK',
      info,
      owner: {
        name: owner?.username,
        avatar: owner?.avatar,
      },
    }
  }
  return {
    message: 'OK',
    info,
    owner: {
      name: owner?.username,
      avatar: owner?.avatar,
    },
  }
})
