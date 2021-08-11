import { prisma } from '../../Infrastructures/utils/prisma'

export default (communityId: number) => {
  const Community = prisma.community
  return Community.update({
    where: { communityId },
    data: {
      viewCount: {
        increment: 1
      }
    },
    include: {
      communityLike: true,
      communityComment: true
    }
  })
}
