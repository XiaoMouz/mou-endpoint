import { auth } from '~/middleware/auth'
import { setFileInfo, setFileRaw } from '~/model/file'
import { getRecord, getValue, initRecord, setRecord } from '~/model/user'
import { File } from '~/types/tool-route/file.types'
import { getAuthToken, getRandomString } from '~/utils/tools'

export default defineEventHandler({
  onRequest: auth,
  handler: async (evt) => {
    const identity = getAuthToken(evt)
    if (!identity) throw createError({ message: '倒反天罡' })
    const username = await getValue(identity.token, identity.email)
    if (!username) throw createError({ message: 'Need init user record' })
    const record = await getRecord(identity.email)
    if (!record) {
      initRecord(identity.email, username.user.username)
      throw createError({ message: 'Need init user record' })
    }
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
    let info: File = {
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
    }
    record?.files.push(info)
    await setRecord(identity.email, record)
    await setFileInfo(id, info)

    return {
      message: 'OK',
      info,
    }
  },
})
