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
  if (result.data.have_password) {
    setResponseStatus(evt, 401, 'OK')
    return {
      message: 'Failed',
      error: 'Password required',
      tips: {
        msg: 'Please use Post method and provide password item to access this post',
        password: 'password',
      },
      data: result.data,
    }
  }

  setResponseStatus(evt, 200, 'OK')
  return {
    message: 'OK',
    data: result.data,
  }
})
