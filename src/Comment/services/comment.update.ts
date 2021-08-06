import { prisma } from '../../Infrastructures/utils/prisma'
import updateCommentValidator from '../validators/updateComment.validator'

export default async function (DTO: updateCommentValidator) {
  const Comment = prisma.comment
  return Comment.update({
    where: { commentId: DTO.commentId },
    data: { content: DTO.content }
  })
}
