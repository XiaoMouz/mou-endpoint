import { deleteFileInfo, getFileInfo, setFileInfo } from '~/model/file'
import { getRecord } from '~/model/user'
import { ensureFile } from '~/utils/check'
import { getAuthToken, getRandomString } from '~/utils/tools'

export default defineEventHandler(async (evt) => {
  const info = await ensureFile(evt)
  const owner = await getRecord(info.uploader)

  if (info.private) {
    const auth = await getAuthToken(evt)
    if (!auth) {
      setResponseStatus(evt, 401)
      return { message: 'Failed', error: 'Need login' }
    }
    if (auth.email !== info.uploader) {
      setResponseStatus(evt, 403)
      return { message: 'Failed', error: 'You not owner' }
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
  if (info.password) {
    return {
      message: 'Failed',
      error: 'Password require (Post)',
    }
  }
  info.downloadToken
    ? setCookie(evt, 'Download-Token', info.downloadToken, {
        maxAge: 60 * 60 * 24,
        domain: 'api.mou.best',
      })
    : {}
  return {
    message: 'OK',
    info,
    owner: {
      name: owner?.username,
      avatar: owner?.avatar,
    },
  }
})
