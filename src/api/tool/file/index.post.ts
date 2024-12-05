import { auth } from '~/middleware/auth'
import { setFileRaw } from '~/model/file'
import { getRecord } from '~/model/user'
import { getAuthToken, getRandomString } from '~/utils/tools'

export default defineEventHandler({
  onRequest: auth,
  handler: async (evt) => {
    const identity = getAuthToken(evt)
    if (!identity) throw createError({ message: '倒反天罡' })
    const record = await getRecord(identity.email)

    const data = await readFormData(evt).catch((e) => {
      console.log(e)
      return null
    })

    if (!data)
      throw createError({ statusCode: 400, message: 'Invalid form data' })
    const file = data.get('data')
    if (!file) throw createError({ message: 'No file' })
    const blob = new Blob([file])
    const id = getRandomString('xxxyyy')
    await blob.arrayBuffer().then(async (arrayBuffer) => {
      const buffer = Buffer.from(arrayBuffer)
      await setFileRaw(id, buffer)
    })
    record?.files.push({
      id,
      uploader: identity.email,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
      expireAt: Date.now() + 14 * 24 * 60 * 60 * 1000,
      r2Link: '',
      status: 'active',
      private: data.get('private') === 'true' || false,
      password: data.get('password')?.toString() || undefined,
      fileSize: blob.size,
      description: data.get('description')?.toString() || undefined,
      comments: [],
    })

    return {
      message: 'OK',
      id,
    }
  },
})
