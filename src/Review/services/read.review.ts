import { prisma } from '../../Infrastructures/utils/prisma'
import moment from '../../Infrastructures/utils/moment'
import { Review } from '@prisma/client'

export default async (bootcampName: string, page: number) => {
  const Review = prisma.review
  const ITEMS_PER_PAGE = 3

  type ReviewType = Omit<Review, 'createdAt'> & {
    createdAt: Date | string
  }

  const reviews: Array<ReviewType> = await Review.findMany({
    where: { bootcampName },
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE * 3,
    orderBy: [{ createdAt: 'desc' }]
  })

  for (const review of reviews) {
    review.createdAt = moment(review.createdAt as Date)
  }

  return reviews
}
