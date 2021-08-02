import { PrismaClient } from '@prisma/client'
import Comment from '../../interfaces/comment.interface'

export default async function (DTO: Comment) {
  const Comment = new PrismaClient().comment
  const createComment = await Comment.create({
    data: DTO
  })
  return createComment
}
