import { prisma } from '../../Infrastructures/utils/prisma'
import { CreateCommunityCommentValidator } from '../validators'

export default async function (DTO: CreateCommunityCommentValidator) {
  const CommunityComment = prisma.communityComment
  return CommunityComment.create({ data: DTO })
}
