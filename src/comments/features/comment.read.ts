import { PrismaClient } from '.prisma/client'
import Comment from '../../interfaces/comment.interface'

export default async function (DTO: Comment) {
  // 여기는 왜 또 error가 안나지?
  const Comment = new PrismaClient().comment
  const readComment = await Comment.findMany({
    where: DTO // category를 받아서 찾아야 되는거 아닌가?
  })

  return readComment
}
