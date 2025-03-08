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
  const cookie_token = getCookie(evt, 'Download-Token')
  if (!cookie_token) {
    setResponseStatus(evt, 401)
    return { message: 'Failed', error: 'Need download token' }
  }
  if (cookie_token !== info.downloadToken) {
    setResponseStatus(evt, 403)
    return { message: 'Failed', error: 'Token is wrong' }
  }
  info.downloadTime += 1
  await setFileInfo(info.id, info)
  const file = await getFileRaw(info.id)
  setHeader(evt, 'Content-Type', info.mimeType || 'application/octet-stream')

  setHeader(
    evt,
    'Content-Disposition',
    `attachment; filename="${encodeURIComponent(
      info.binaryName || info.title
    )}"`
  )
  send(evt, file)
  return { message: 'OK' }
})
