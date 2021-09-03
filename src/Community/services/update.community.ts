import moment from '../../Infrastructures/utils/moment'
import { prisma } from '../../Infrastructures/utils/prisma'
import { Community } from '@prisma/client'
import { UpdateCommunityValidator } from '../validators'

export default async function (
  communityId: number,
  DTO: UpdateCommunityValidator
) {
  const Community = prisma.community

  type CommunityDTO = Omit<Community, 'createdAt'> & {
    createdAt: Date | string
  }

  const community: CommunityDTO = await Community.update({
    where: { communityId },
    data: DTO
  })

  community.createdAt = moment(community.createdAt as Date)
  
  return community
}
