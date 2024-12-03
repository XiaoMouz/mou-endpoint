export interface StandardLog {
  message: string
  level: 'info' | 'warn' | 'error'
  createdAt: number
}
