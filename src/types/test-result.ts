export interface TestResult {
  delay: number
  error: boolean
  status: 'up' | 'down' | 'unknown' | undefined
  time: number
}
