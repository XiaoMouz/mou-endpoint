import { set } from 'zod'
import { getRecord } from '~/model/user'
import { ensureCopyboard } from '~/utils/check'

export default defineEventHandler({
  handler: async (evt) => {
    const info = await ensureCopyboard(evt)
    if (info.password) {
      setResponseStatus(evt, 403)
      return {
        message: 'Failed',
        error: 'Password require (Post)',
      }
    }

    const owner =
      info.uploader === 'anonymous'
        ? { username: 'Anonymous', avatar: null }
        : await getRecord(info.uploader)
    return {
      message: 'OK',
      info,
      owner: {
        name: owner?.username,
        avatar: owner?.avatar,
      },
    }
  },
})
