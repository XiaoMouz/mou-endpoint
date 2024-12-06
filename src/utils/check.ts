import { H3Event } from 'h3'
import { deleteFileInfo, getFileInfo, setFileInfo } from '~/model/file'
import { getAuthToken, getRandomString } from './tools'
import { getCopyboard } from '~/model/copyboard'

export async function ensureFile(evt: H3Event) {
  const id = getRouterParam(evt, 'id')
  if (!id) {
    setResponseStatus(evt, 400)
    throw createError({ message: 'Invalid ID' })
  }
  const info = await getFileInfo(id)
  if (!info) {
    setResponseStatus(evt, 404)
    throw createError({ message: 'Not Found' })
  }
  if (info.expireAt < Date.now()) {
    await deleteFileInfo(id)
    setResponseStatus(evt, 404)
    throw createError({ message: 'Not Found' })
  }
  if (info.status !== 'active') {
    setResponseStatus(evt, 403)
    throw createError({ message: 'File is not active' })
  }
  if (!info.downloadToken) {
    const token = getRandomString('xxxxyyxxxyxxyx')
    info.downloadToken = token
    await setFileInfo(info.id, info)
  }
  return info
}
export async function ensureCopyboard(evt: H3Event) {
  const id = getRouterParam(evt, 'id')
  if (!id) {
    setResponseStatus(evt, 400)
    throw createError({ message: 'Invalid ID' })
  }
  const info = await getCopyboard(id)
  if (!info) {
    setResponseStatus(evt, 404)
    throw createError({ message: 'Not Found' })
  }
  if (info.expireAt < Date.now()) {
    await deleteFileInfo(id)
    setResponseStatus(evt, 404)
    throw createError({ message: 'Not Found' })
  }
  if (info.status !== 'active') {
    setResponseStatus(evt, 403)
    throw createError({ message: 'File is not active' })
  }
  if (info.private) {
    const auth = getAuthToken(evt)
    if (!auth) {
      setResponseStatus(evt, 401)
      throw createError({ message: 'Need login' })
    }
    if (auth.email !== info.uploader) {
      setResponseStatus(evt, 403)
      throw createError({ message: 'You not owner' })
    }
  }
  return info
}
