export function getSeededUUID(seed: number = Date.now()): string {
  function seededRandom(seed: number): number {
    const x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
  }

  const randomPart = 'xxxx-yyyy'.replace(/[xy]/g, function (c) {
    const r = (seededRandom(seed) * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
  return `${randomPart}`
}
