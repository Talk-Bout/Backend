import { prisma } from '../../Infrastructures/utils/prisma'
import { Bootcamp, Review } from '@prisma/client'
import averageStars from '../../Infrastructures/utils/averageStars'
import moment from '../../Infrastructures/utils/moment'

export default async (page: number) => {
  const Bootcamp = prisma.bootcamp
  const ITEMS_PER_PAGE = 12

  type BootcampType = Bootcamp & {
    review: Array<Review>
    star?: number
    reviewNumber?: number
  }

  type ReviewType = Omit<Review, 'createdAt'> & {
    createdAt: Date | string
  }

  const bootcamps: Array<BootcampType> = await Bootcamp.findMany({
    include: { review: true },
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE * 2
  })

  for (const bootcamp of bootcamps) {
    bootcamp.star = averageStars(bootcamp.review)

    if (bootcamp.review) {
      bootcamp.reviewNumber = bootcamp.review.length
    } else {
      bootcamp.reviewNumber = 0
    }

    if (bootcamp.review.length) {
      const reviews = bootcamp.review as Array<ReviewType>

      for (const review of reviews) {
        review.createdAt = moment(review.createdAt as Date)
      }
    }
  }

  return bootcamps.sort((a, b) => b.reviewNumber! - a.reviewNumber!)
}
