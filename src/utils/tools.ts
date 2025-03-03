import crypto from 'crypto'
import { H3Event } from 'h3'
import { getValue } from '~/model/user'

export function getRandomString(
  format: string = 'xxxx-yyyy',
  charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  // 创建随机字符串生成器
  const random = (max: number) => {
    const randomBuffer = crypto.getRandomValues(new Uint8Array(1)) // 使用 Worker 环境中的随机数生成
    return randomBuffer[0] % max // 取模以限制范围
  }

  // 生成随机字符串
  let result = ''
  for (let i = 0; i < format.length; i++) {
    if (format[i] === 'x') {
      result += charset[random(charset.length)]
    } else if (format[i] === 'y') {
      result += charset[random(charset.length)] // 修复此行，确保从 charset 中选择字符
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
  const cookieToken = getCookie(evt, 'Authorization')
  let auth
  if (headerAuth) {
    auth = {
      token: headerAuth.split(':')[0],
      email: headerAuth.split(':')[1],
    }
  } else if (cookieToken) {
    auth = {
      token: cookieToken.split(':')[0],
      email: cookieToken.split(':')[1],
    }
  } else {
    return null
  }

  const result = await getValue(auth.token, auth.email)
  if (!result) return null

  if (result.expireAt > Date.now()) return auth
  return null
}

export function setAuthToken(evt: H3Event, token: string, email: string): void {
  setHeader(evt, 'Authorization', `${token}:${email}`)
  setCookie(evt, 'Authorization', `${token}:${email}`)
}
