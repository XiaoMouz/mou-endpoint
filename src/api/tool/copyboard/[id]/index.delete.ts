import { deleteCopyboard } from '~/model/copyboard'
import { deleteFileInfo, getFileInfo } from '~/model/file'
import { ensureCopyboard, ensureFile } from '~/utils/check'
import { getAuthToken } from '~/utils/tools'

export default defineEventHandler(async (evt) => {
  const info = await ensureCopyboard(evt)
  const sender = await getAuthToken(evt)
  if (info.uploader !== 'anonymous' && info.uploader !== sender?.email) {
    setResponseStatus(evt, 403)
    return { message: 'Failed', error: 'You not owner' }
  }
  await deleteCopyboard(info.id)
  return {
    message: 'OK',
    info,
  }
})
