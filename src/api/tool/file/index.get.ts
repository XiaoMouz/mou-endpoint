import { auth } from '~/middleware/auth'
import { getRecord } from '~/model/user'
import { getAuthToken } from '~/utils/tools'

export default defineEventHandler({
  onRequest: auth,
  handler: async (evt) => {
    const identity = await getAuthToken(evt)
    if (!identity) throw createError({ message: '倒反天罡' })
    const record = await getRecord(identity.email)
    if (!record) return { message: 'OK', record }
    return { message: 'OK', files: record.files }
  },
})
