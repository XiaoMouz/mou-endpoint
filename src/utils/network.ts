import { type Node } from '~/types/node'
import { type TestResult } from '~/types/test-result'

export async function testNode(node: Node): Promise<TestResult> {
  fetch(`http://${node.address}/`, {
    method: 'GET',
  })
  const start = Date.now()
  return fetch(`http://${node.address}/`, {
    method: 'GET',
  })
    .then((response) => {
      const end = Date.now()
      return {
        delay: end - start,
        error: false,
        status: 'up' as const,
        time: end,
      }
    })
    .catch((error) => {
      const end = Date.now()
      if (
        error.status === 403 ||
        error.status === 404 ||
        error.status === 500
      ) {
        return {
          delay: end - start,
          error: false,
          status: 'up' as const,
          time: end,
        }
      }
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
