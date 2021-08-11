import { prisma } from '../../Infrastructures/utils/prisma'

export default async (bootcampName: string, page: number) => {
  const Community = prisma.community
  const ITEMS_PER_PAGE = 5

  return Community.findMany({
    where: { bootcampName },
    include: {
      communityLike: true,
      communityComment: true
    },
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE * 3,
  })
}
