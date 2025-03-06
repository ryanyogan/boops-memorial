export interface UserType {
  id: string
  name: string | null
  email: string
  image: string | null
}

export interface ImageType {
  id: string
  url: string
  caption: string | null
  createdAt: string
  userId: string
  user?: UserType
  comments?: CommentType[]
}

export interface CommentType {
  id: string
  content: string
  createdAt: string
  userId: string
  imageId: string
  parentId: string | null
  user?: UserType
  replies?: CommentType[]
}

