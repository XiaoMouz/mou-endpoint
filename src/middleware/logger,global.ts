import { putValue } from '~/model/log'

export default defineEventHandler(async (event) => {
  let message = `[INFO] [${event.method}] From: @${
    event.node.req.headers['x-forwarded-for'] ||
    event.node.req.socket.remoteAddress ||
    'Unknown'
  } To (${event.node.req.url})`
  console.log(message)
  await putValue({
    message,
    level: 'info',
    createdAt: Date.now(),
  })
})
