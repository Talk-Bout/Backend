import { PrismaClient } from '.prisma/client'

export default async function (DTO: any) {
  // 이 부분 왜 any 써야하는지 여전히 의문?
  const Comment = new PrismaClient().comment
  const updateComment = Comment.update({
    where: {
      commentId: DTO.commentId
    },
    data: {
      content: DTO.content
    }
  })

  return updateComment
}
