import moment from '../../Infrastructures/utils/moment'
import { Community } from '@prisma/client'
import { prisma } from '../../Infrastructures/utils/prisma'

export default async (bootcampName: string, page: number) => {
  const Community = prisma.community
  const ITEMS_PER_PAGE = 5

  type CommunityDTO = Omit<Community, 'createdAt'> & {
    createdAt: Date | string
  }

  const communities: Array<CommunityDTO> = await Community.findMany({
    where: { bootcampName },
    include: {
      communityLike: true,
      communityComment: true,
      user: { select: { profilePic: true }}
    },
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE * 3,
  })

  return communities.map((community) => {
    community.createdAt = moment(community.createdAt as Date)
    return community
  })
}
