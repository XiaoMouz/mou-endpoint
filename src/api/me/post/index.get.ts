import { useClient } from '~/utils/supabase'
export default defineEventHandler(async (evt) => {
  const client = useClient()
  const offsetQuery = getQuery(evt).offset
  const sizeQuery = getQuery(evt).size
  const offset =
    offsetQuery && !Array.isArray(offsetQuery)
      ? parseInt(offsetQuery.toString())
      : 0
  const size =
    sizeQuery && !Array.isArray(sizeQuery) ? parseInt(sizeQuery.toString()) : 5
  if (size > 50 || size < 1) {
    setResponseStatus(evt, 400, 'Bad Request')
    return {
      message: 'Failed',
      error: 'Size must be between 1 and 50',
    }
  }
  const { data } = await client
    .from('contents')
    .select(
      'cid, title, create_time, update_time, password,tags , have_password ,author, type,state,parent,allow_comment,allow_anonymous_comment,views_num,stars_num,description'
    )
    .eq('type', 'post')
    .eq('state', 'publish')
    .order('create_time', { ascending: false })
    .range(offset, offset + size - 1)
  if (!data) {
    setResponseStatus(evt, 404, 'Not Found')
    return {
      message: 'Failed',
      error: 'No data available - empty db result',
    }
  }

  for (const item of data) {
    if (item.have_password) {
      item.password = '******'
    }
  }
  return {
    message: 'OK',
    data: data,
  }
})
