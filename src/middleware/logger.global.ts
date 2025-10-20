export default defineEventHandler(async (event) => {
  const message = `[INFO] [${event.method}] From: @${
    getHeader(event, 'X-Forwarded-For') ||
    event.node.req.socket.remoteAddress ||
    getHeader(event, 'CF-Connecting-IP') ||
    'Unknown'
  } To (${event.node.req.url})`
  console.log(message)
})
