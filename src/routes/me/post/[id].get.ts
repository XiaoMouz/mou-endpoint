import { useClient } from '~/utils/supabase'
export default defineEventHandler(async (evt) => {
  if (!evt.context.params) {
    return {
      message: 'Failed',
      error: 'No data available - empty db result',
    }
  }
  const client = useClient()
  let result = await client
    .from('contents')
    .select('*')
    .eq('cid', evt.context.params.id)
    .single()
  if (!result.data) {
    result = await client
      .from('contents')
      .select('*')
      .eq('slug', evt.context.params.id)
      .single()
  }
  if (!result.data) {
    setResponseStatus(evt, 404, 'Not Found')
    return {
      message: 'Failed',
      error: 'No data available - empty db result',
    }
  }
  if (!result.data.have_password) {
    setResponseStatus(evt, 200, 'OK')
    return {
      message: 'OK',
      data: result.data,
    }
  }
  if (!getQuery(evt).password) {
    setResponseStatus(evt, 401, 'Need Password')
    result.data.password = '******'
    result.data.content = ''
    return {
      message: 'Failed',
      error: 'Password required',
      data: result.data,
    }
  }
  if (result.data.password !== getQuery(evt).password) {
    setResponseStatus(evt, 403, 'Wrong Password')
    result.data.password = '******'
    result.data.content = ''
    return {
      message: 'Failed',
      error: 'Password error',
      data: result.data,
    }
  }
  setResponseStatus(evt, 200, 'OK')
  return {
    message: 'OK',
    data: result.data,
  }
})
