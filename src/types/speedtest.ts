import { type Node } from './node'
import { TestResult } from './test-result'

export interface Result {
  id: string
  info: Node
  results: TestResult[]
}
