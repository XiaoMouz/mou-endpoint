export async function getValue<TokenSession>(token: string) {
  const storage = useStorage('kv')
  const result = await storage.getItem<TokenSession>('auth:' + token)
  return result
}

export async function setValue<TokenSession>(
  token: string,
  value: TokenSession
) {
  const storage = useStorage('kv')
  await storage.setItem('auth:' + token, value)
}

export async function haveValue(token: string) {
  const storage = useStorage('kv')
  const result = await storage.hasItem('auth:' + token)
  return result
}
