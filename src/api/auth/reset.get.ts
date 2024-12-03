import { auth } from '~/middleware/auth'
import { deleteValue, getValue, setValue } from '~/model/user'
import { getAuthToken, getRandomString, setAuthToken } from '~/utils/tools'

export default defineEventHandler({
  onRequest: auth,
  handler: async (evt) => {
    const headToken = getAuthToken(evt)
    if (!headToken) {
      return {
        message: 'Failed',
        error: 'Invalid Token',
      }
    }
    let old = await getValue(headToken.token, headToken.email)
    if (!old) {
      return {
        message: 'OK',
        error: 'Not Found',
      }
    }
    await deleteValue(headToken.token, headToken.email)
    const token = getRandomString('xxxxyyxxxyxxyx')
    const refreshToken = getRandomString('xyxxyyyyxxyx')
    const session = {
      token,
      refreshToken,
      expireAt: 30 * 24 * 60 * 60 * 1000 + Date.now(),
      createdAt: Date.now(),
      user: {
        id: old.user.id,
        username: old.user.username,
        email: old.user.email,
      },
    }

    await setValue(token, old.user.email, session)
    setAuthToken(evt, token, old.user.email)
    return {
      message: 'OK',
      session,
    }
  },
})
