import { prisma } from '../../Infrastructures/utils/prisma'

export default async function (communityCommentId: number) {
  const CommunityComment = prisma.communityComment
  return CommunityComment.delete({ where: { communityCommentId }})
}
