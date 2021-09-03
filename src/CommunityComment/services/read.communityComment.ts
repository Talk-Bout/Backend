import moment from '../../Infrastructures/utils/moment'
import { CommunityComment } from '@prisma/client'
import { prisma } from '../../Infrastructures/utils/prisma'

export default async (communityId: number, page: number) => {
  const CommunityComment = prisma.communityComment
  const ITEMS_PER_PAGE = 5

  type CommunityCommentDTO = Omit<CommunityComment, 'createdAt'> & {
    createdAt: Date | string
  }

  const communityComments: Array<CommunityCommentDTO> = await CommunityComment.findMany({ 
    where: { communityId },
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  })

  return communityComments.map(comment => {
    comment.createdAt = moment(comment.createdAt as Date)
    return comment
  })
}
