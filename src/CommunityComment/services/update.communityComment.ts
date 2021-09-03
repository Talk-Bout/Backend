import moment from '../../Infrastructures/utils/moment'
import { CommunityComment } from '@prisma/client'
import { prisma } from '../../Infrastructures/utils/prisma'

export default async function (
  communityCommentId: number,
  content: string
) {
  const CommunityComment = prisma.communityComment

  type CommunityCommentDTO = Omit<CommunityComment, 'createdAt'> & {
    createdAt: Date | string
  }

  const communityComment: CommunityCommentDTO = await CommunityComment.update({
    where: { communityCommentId },
    data: { content }
  })

  communityComment.createdAt = moment(communityComment.createdAt as Date)
  
  return communityComment
}
