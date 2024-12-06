import { deleteFileInfo, getFileInfo } from '~/model/file'
import { getRecord } from '~/model/user'
import { ensureCopyboard, ensureFile } from '~/utils/check'
import { getAuthToken } from '~/utils/tools'

export default defineEventHandler(async (evt) => {
  const info = await ensureCopyboard(evt)

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
  return {
    message: 'OK',
    info,
    owner: {
      name: owner?.username,
      avatar: owner?.avatar,
    },
  }
})
