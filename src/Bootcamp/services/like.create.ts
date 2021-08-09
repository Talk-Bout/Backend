import { prisma } from '../../Infrastructures/utils/prisma'
import createLikeValidator from '../validators/createLike.validator'

export default async function (DTO: createLikeValidator) {
  const CommunityLike = prisma.communityLike
  return CommunityLike.create({ data: DTO })
}
