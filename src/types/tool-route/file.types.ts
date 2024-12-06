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
  downloadToken?: string
  downloadTime: number
  comments: Comment[] | undefined
}
export interface Comment {
  id: string
  creator: string | 'anonymous'
  name: string | undefined
  mail: string | undefined
  fromIP: string
  content: string
}
