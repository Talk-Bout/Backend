import { prisma } from '../../Infrastructures/utils/prisma'
import { CreateCommunityJunctionValidator } from '../validators'

export default async function (DTO: CreateCommunityJunctionValidator) {
  const CommunityLike = prisma.communityLike
  return CommunityLike.create({ data: DTO })
}
