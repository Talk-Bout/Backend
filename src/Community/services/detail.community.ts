import moment from '../../Infrastructures/utils/moment'
import { Community } from '@prisma/client'
import { prisma } from '../../Infrastructures/utils/prisma'

export default async (communityId: number) => {
  const Community = prisma.community

  type CommunityDTO = Omit<Community, 'createdAt'> & {
    createdAt: Date | string
  }

  const community: CommunityDTO = await Community.update({
    where: { communityId },
    data: { viewCount: { increment: 1 }
    },
    include: {
      communityLike: true,
      communityComment: true,
      user: { select: { profilePic: true }}
    }
  })

  community.createdAt = moment(community.createdAt as Date)
  
  return community
}
