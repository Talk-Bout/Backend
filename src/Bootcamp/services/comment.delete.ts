import { prisma } from '../../Infrastructures/utils/prisma'
import CommentIdValidator from '../validators/commentId.validator'

export default async function (DTO: CommentIdValidator) {
  const CommunityComment = prisma.communityComment
  return CommunityComment.delete({ where: DTO })
}
