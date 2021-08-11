import { prisma } from '../../Infrastructures/utils/prisma'

export default async function (
  communityCommentId: number,
  content: string
) {
  const CommunityComment = prisma.communityComment
  return CommunityComment.update({
    where: { communityCommentId },
    data: { content }
  })
}
