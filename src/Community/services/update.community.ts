import { prisma } from '../../Infrastructures/utils/prisma'
import { UpdateCommunityValidator } from '../validators'

export default async function (
  communityId: number,
  DTO: UpdateCommunityValidator
) {
  const Community = prisma.community
  return Community.update({
    where: { communityId },
    data: DTO
  })
}
