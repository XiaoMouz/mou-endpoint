import { deleteFileInfo, getFileInfo } from '~/model/file'
import { getRecord } from '~/model/user'
import { getAuthToken } from '~/utils/tools'

export default defineEventHandler(async (evt) => {
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

  if (info.password) {
    setResponseStatus(evt, 403)
    return {
      message: 'Failed',
      error: 'Need password(method: post, field: password)',
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
  return {
    message: 'OK',
    info,
    owner: {
      name: owner?.username,
      avatar: owner?.avatar,
    },
  }
})
