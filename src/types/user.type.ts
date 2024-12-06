import { Content } from './tool-route/copyboard.type'
import { File } from './tool-route/file.types'

export interface TokenSession {
  token: string
  user: {
    id: string
    username: string
    email: string
    avatar?: string
  }
  refreshToken: string
  expireAt: number
  createdAt: number
}

export interface UserRecord {
  email: string
  username: string
  avatar?: string
  files: { id: string; name: string }[]
  copyboards: { id: string; name: string }[]
}
