import { User, Post } from '@prisma/client'

export interface PostComment {
  postCommentId: number
  createdAt: Date | string
  content: string
  nickname: string
  postId: number

  user: Array<User>
  post: Array<Post>
}
