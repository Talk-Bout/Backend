import { PostLike } from '@prisma/client'

export interface Post {
  postId: number
  createdAt: Date | string
  viewCount: number
  title: string
  content: string
  category: string
  image: string
  nickname: string

  postLike: Array<PostLike>
}
