import { prisma } from '../../Infrastructures/utils/prisma'
import CommunityLikeIdValidator from '../validators/communityLikeId.validator'

export default async function (DTO: CommunityLikeIdValidator) {
  const CommunityLike = prisma.communityLike
  return CommunityLike.delete({ where: DTO })
}
