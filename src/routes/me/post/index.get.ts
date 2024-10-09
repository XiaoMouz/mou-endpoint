import { type Database } from '~/types/database.types'
export default defineEventHandler(async (evt) => {
  const client = useCleint()
  // 从 supabase 获取数据，content 表中 type 为 post ，以 create time 降序排列
  const { data } = await client
    .from('contents')
    .select('*')
    .eq('type', 'post')
    .eq('state', 'publish')
    .order('create_time', { ascending: false })
    .limit(10)
  if (!data) {
    return {
      message: 'Failed',
      error: 'No data available - empty db result',
    }
  }
  // for each检查数据中是否有密码，若有将密码和内容删除

  for (const item of data) {
    if (item.password) {
      item.password = '******'
      item.content = '******'
    }
  }
  return {
    message: 'OK',
    data: data,
  }
})
