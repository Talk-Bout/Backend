import { PrismaClient } from '.prisma/client'

export default (DTO: any) => {
  // 이 부분 왜 any 써야하는지 여전히 의문?
  const Comment = new PrismaClient().comment
  return Comment.update({
    where: {
      commentId: DTO.commentId
    },
    data: {
      content: DTO.content
    }
  })

}
