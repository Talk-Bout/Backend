import { prisma } from '../../Infrastructures/utils/prisma'

export default (bootcampName: string, page: number) => {
  const Review = prisma.review
  const ITEMS_PER_PAGE = 3

  return Review.findMany({ 
    where: { bootcampName },
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  })
}
