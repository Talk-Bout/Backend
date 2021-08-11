import { prisma } from '../../Infrastructures/utils/prisma'
import { UpdatePostCommentValidator } from '../validators'

export default async function (postCommentId: number, DTO: UpdatePostCommentValidator) {
  const PostComment = prisma.postComment
  return PostComment.update({
    where: { postCommentId },
    data: { content: DTO.content }
  })
}
