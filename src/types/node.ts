export interface Node {
  id: number
  title: string
  address: string
  description: string | undefined
  serviceFrom: string
  controledStatus: 'up' | 'down' | 'unknown' | 'maintenance'
  tags: string[]
}
