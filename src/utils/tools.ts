import crypto from 'crypto'
import { H3Event } from 'h3'
import { getValue } from '~/model/user'

export function getRandomString(
  format: string = 'xxxx-yyyy',
  charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  // 创建随机字符串生成器
  const random = (max: number) => {
    const randomBuffer = crypto.randomBytes(1) // 每次生成一个随机字节
    return randomBuffer[0] % max // 取模以限制范围
  }

  // 生成随机字符串
  let result = ''
  for (let i = 0; i < format.length; i++) {
    if (format[i] === 'x') {
      result += charset[random(charset.length)]
    } else if (format[i] === 'y') {
      result += random(charset.length - 1)
    } else {
      result += format[i] // 保留其他字符，例如 '-'
    }
  }

  return result
}

export async function getAuthToken(evt: H3Event): Promise<{
  token: string
  email: string
} | null> {
  const headerAuth = getHeader(evt, 'Authorization')
  let auth
  if (headerAuth) {
    auth = {
      token: headerAuth.split(':')[0],
      email: headerAuth.split(':')[1],
    }
  }
  const cookieToken = getCookie(evt, 'Authorization')
  if (cookieToken) {
    auth = {
      token: cookieToken.split(':')[0],
      email: cookieToken.split(':')[1],
    }
  }

  if (!auth) return null
  const result = await getValue(auth.token, auth.email)
  if (!result) return null

  if (result.expireAt > Date.now()) return auth
  return null
}

export function setAuthToken(evt: H3Event, token: string, email: string): void {
  setHeader(evt, 'Authorization', `${token}:${email}`)
  setCookie(evt, 'Authorization', token)
}
