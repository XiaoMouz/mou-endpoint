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
      'use post to access password protected post': `${protocol}://${host}/me/post/:id`,
    },
    auth: {
      'get token(post)': `${protocol}://${host}/auth/`,
      'reset token (if didnt have header use post)': `${protocol}://${host}/auth/reset`,
      'refresh token': `${protocol}://${host}/auth/refresh`,
    },
    tool: {
      file: {
        'upload file(need auth)': `${protocol}://${host}/tool/file/`,
        'get yours all files(need auth)': `${protocol}://${host}/tool/file/`,
        'get file': `${protocol}://${host}/tool/file/:id`,
      },
      copyboard: {
        todo: `${protocol}://${host}/tool/copyboard/`,
        'get copyboard data': `${protocol}://${host}/tool/copyboard/:id`,
      },
    },
  }
})
