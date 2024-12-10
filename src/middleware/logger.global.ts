import { putValue } from '~/model/log'

export default defineEventHandler(async (event) => {
  let message = `[INFO] [${event.method}] From: @${
    getHeader(event, 'X-Forwarded-For') ||
    event.node.req.socket.remoteAddress ||
    getHeader(event, 'CF-Connecting-IP') ||
    'Unknown'
  } To (${event.node.req.url})`
  console.log(message)
  // disable logging to kv, limit is reached
  // await putValue({
  //   message,
  //   level: 'info',
  //   createdAt: Date.now(),
  // })
})
