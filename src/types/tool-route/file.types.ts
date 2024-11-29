export interface File {
  id: string
  uploader: string
  createdAt: number
  modifiedAt: number
  expireAt: number
  r2Link: string
  status: 'active' | 'disabled' | 'frozen'
  private: boolean
  password: string | undefined
  fileSize: number
  description: string | undefined
  comments: Comment[] | undefined
}
export interface Comment {
  id: string
  creater: string | 'anonymous'
  fromIP: string
  content: string
}
