import { prisma } from '../../Infrastructures/utils/prisma'
import CommentIdValidator from '../validators/commentId.validator'
import UpdateCommentValidator from '../validators/updateComment.validator'

export default async function (
  commentId: CommentIdValidator,
  DTO: UpdateCommentValidator
) {
  const CommunityComment = prisma.communityComment
  return CommunityComment.update({
    where: commentId,
    data: DTO
  })
}
