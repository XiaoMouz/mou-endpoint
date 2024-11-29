export interface Content {
  id: string
  uploader: string | 'anonymous'
  createdAt: number
  modifiedAt: number
  expireAt: number
  content: string
  status: 'active' | 'disabled' | 'frozen'
  private: boolean
  password: string | undefined
  history: ContentHistroy[]
}

interface ContentHistroy {
  contentTime: number
  content: string
}
