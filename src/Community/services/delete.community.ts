import { prisma } from '../../Infrastructures/utils/prisma'

export default async function (communityId: number) {
  const Community = prisma.community
  return Community.delete({ where: { communityId }})
}
