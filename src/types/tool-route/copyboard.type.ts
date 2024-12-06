export interface Content {
  id: string
  uploader: string | 'anonymous'
  createdAt: number
  name: string
  modifiedAt: number
  expireAt: number
  content: string
  status: 'active' | 'frozen'
  private: boolean
  password: string | undefined
  history: ContentHistroy[]
}

interface ContentHistroy {
  contentTime: number
  content: string
}
