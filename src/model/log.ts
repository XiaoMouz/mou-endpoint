import type { TokenSession } from '~/types/user.type'

import {
  getValue as getTValue,
  setValue as setTValue,
  haveValue as haveTValue,
  deleteValue as deleteTValue,
} from './kv'

import type { StandardLog } from '~/types/log.type'

export async function getValue(time = new Date().setHours(0, 0, 0, 0)) {
  // get today timestamp in day
  const result = await getTValue<StandardLog[]>(`log:${time}`)
  return result
}

export async function setValue(
  value: StandardLog[],
  time = new Date().setHours(0, 0, 0, 0)
) {
  await setTValue(`log:${time}`, value)
}

export async function putValue(
  value: StandardLog,
  time = new Date().setHours(0, 0, 0, 0)
) {
  const logs = await getValue(time)
  if (!logs) {
    await setValue([value], time)
    return
  }
  logs.push(value)
  await setValue(logs, time)
}
