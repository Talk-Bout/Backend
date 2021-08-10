import { prisma } from '../../Infrastructures/utils/prisma'
import createCommentValidator from '../validators/createComment.validator'

export default async function (DTO: createCommentValidator) {
  const CommunityComment = prisma.communityComment
  return CommunityComment.create({ data: DTO })
}
