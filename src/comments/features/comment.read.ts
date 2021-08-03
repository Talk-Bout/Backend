import { PrismaClient } from '.prisma/client'
import Comment from '../../interfaces/comment.interface'

export default async function (DTO: number) {
  const Comment = new PrismaClient().comment
  const readComment = await Comment.findMany({
    where: { postId: DTO }
  })

  return readComment
}
