import { prisma } from '../../Infrastructures/utils/prisma'

export default async function (communityLikeId: number) {
  const CommunityLike = prisma.communityLike
  return CommunityLike.delete({ where: { communityLikeId }})
}
