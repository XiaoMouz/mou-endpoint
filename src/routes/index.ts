export default defineEventHandler((event) => {
  // 返回可用的路由
  //get visit host
  const host = getHeader(event, 'host')
  // get protocol
  const protocol = getHeader(event, 'x-forwarded-proto')
  return {
    'node record': {
      'all node test records': `${protocol}://${host}/node/record`,
      'node test record': `${protocol}://${host}/node/record/:id`,
    },
    scheduled: `${protocol}://${host}/__scheduled`,
    post: {
      'posts(only title)': `${protocol}://${host}/me/post/`,
      'post(index or slug)': `${protocol}://${host}/me/post/:id`,
      
    },
  }
})
