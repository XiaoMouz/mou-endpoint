import { getFileInfo, getFileRaw, setFileInfo } from '~/model/file'
import { ensureFile } from '~/utils/check'
import { getAuthToken } from '~/utils/tools'

export default defineEventHandler(async (evt) => {
  const info = await ensureFile(evt)
  if (info.private) {
    const auth = await getAuthToken(evt)
    if (!auth || auth.email !== info.uploader) {
      setResponseStatus(evt, 403)
      return { message: 'Failed', error: 'You not owner' }
    }
  }
  const token = getHeader(evt, 'Download-Token')
  if (!token) {
    setResponseStatus(evt, 401)
    return { message: 'Failed', error: 'Need download token' }
  }
  if (token !== info.downloadToken) {
    setResponseStatus(evt, 403)
    return { message: 'Failed', error: 'Token is wrong' }
  }
  info.downloadTime += 1
  await setFileInfo(info.id, info)
  const file = await getFileRaw(info.id)
  return file
})
