import { prisma } from '../../Infrastructures/utils/prisma'

export default (communityId: number, page: number) => {
  const CommunityComment = prisma.communityComment
  const ITEMS_PER_PAGE = 5

  return CommunityComment.findMany({ 
    where: { communityId },
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  })
}
