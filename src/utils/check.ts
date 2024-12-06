import { H3Event } from 'h3'
import { deleteFileInfo, getFileInfo, setFileInfo } from '~/model/file'
import { File } from '~/types/tool-route/file.types'
import { getRandomString } from './tools'

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
