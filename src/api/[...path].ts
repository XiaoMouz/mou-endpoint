// server/api/[...path].ts
export default defineEventHandler((event) => {
  if (event.method === 'OPTIONS') {
    return ''
  }
})
