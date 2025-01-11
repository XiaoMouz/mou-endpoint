export interface File {
  id: string
  uploader: string
  createdAt: number
  title: string
  modifiedAt: number
  expireAt: number
  r2Link: string
  status: 'active' | 'frozen'
  private: boolean
  password?: string
  fileSize: number
  description?: string
  binaryName?: string
  downloadToken?: string
  downloadTime: number
  comments?: Comment[]
  mimeType?: string
}
export interface Comment {
  id: string
  creator: string | 'anonymous'
  name: string | undefined
  mail: string | undefined
  fromIP: string
  content: string
}
