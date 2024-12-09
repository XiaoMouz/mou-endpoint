const trustOrigin = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5000',
  'https://mou.best',
  'https://*.mou.best',
]
export default defineEventHandler((event) => {
  // if headers origin match regex or domain match trustOrigin set Access-Control-Allow-Origin header
  const origin = getHeader(event, 'Origin')
  if (
    origin &&
    (new RegExp(trustOrigin.join('|')).test(origin) ||
      trustOrigin.includes(origin))
  ) {
    setResponseHeader(event, 'Access-Control-Allow-Origin', origin)
  }
  if (event.method === 'OPTIONS') {
    return ''
  }
})
