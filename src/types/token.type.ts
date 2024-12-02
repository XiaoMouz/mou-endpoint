export interface TokenSession {
  token: string
  user: {
    id: string
    username: string
    email: string
  }
  refreshToken: string
  expireAt: number
  createdAt: number
}
