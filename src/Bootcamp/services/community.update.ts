import { prisma } from '../../Infrastructures/utils/prisma'
import CommunityIdValidator from '../validators/communityId.validator'
import UpdateCommunityValidator from '../validators/updateCommunity.validator'

export default async function (
  communityId: CommunityIdValidator,
  DTO: UpdateCommunityValidator
) {
  const Community = prisma.community
  return Community.update({
    where: communityId,
    data: DTO
  })
}
