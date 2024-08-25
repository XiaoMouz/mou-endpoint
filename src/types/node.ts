export interface Node {
  id: string
  title: string
  address: string
  description: string | undefined
  serviceFrom: string
  controledStatus: 'up' | 'down' | 'unknown' | 'maintenance'
}
