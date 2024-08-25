import { type Node } from '~/types/node'
import { type TestResult } from '~/types/test-result'

export async function testNode(node: Node): Promise<TestResult> {
  const start = Date.now()
  return await fetch(`https://${node.address}/`, {
    method: 'GET',
  })
    .then((response) => {
      const end = Date.now()
      return {
        delay: end - start,
        error: !response.ok,
        status: 'up' as const,
        time: end,
      }
    })
    .catch((error) => {
      const end = Date.now()
      return {
        delay: end - start,
        error: true,
        status: 'down' as const,
        time: end,
      }
    })
    .finally(() => {
      const end = Date.now()
      return {
        delay: end - start,
        error: true,
        status: 'unknown' as const,
        time: end,
      }
    })
}
