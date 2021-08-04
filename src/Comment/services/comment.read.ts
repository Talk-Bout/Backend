import { PrismaClient } from '.prisma/client'

export default async function (DTO: number) {
  const Comment = new PrismaClient().comment
  const readComment = await Comment.findMany({
    where: { postId: DTO }
  })

  return readComment
}
