import { PrismaClient } from '@prisma/client'

export default async function (DTO: any) {
  const Comment = new PrismaClient().comment
  const createComment = await Comment.create({
    data: DTO
  })
  return createComment
}
