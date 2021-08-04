import { PrismaClient } from '.prisma/client'

export default async function (DTO: any) {
  const Comment = new PrismaClient().comment
  const deleteComment = await Comment.delete({
    where: {
      commentId: DTO
    }
  })

  return deleteComment
}
