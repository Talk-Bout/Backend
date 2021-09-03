import { prisma } from '../../Infrastructures/utils/prisma'
import { Bootcamp, Review } from '@prisma/client'
import averageStars from '../../Infrastructures/utils/averageStars'
import moment from '../../Infrastructures/utils/moment'

export default async (bootcampName: string) => {
  const Bootcamp = prisma.bootcamp

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
    where: {
      bootcampName: {
        not: bootcampName
      }
    }
  })

  for (const bootcamp of bootcamps) {
    bootcamp.star = averageStars(bootcamp.review)
    bootcamp.reviewNumber = bootcamp.review.length

    if (bootcamp.review.length) {
      const reviews = bootcamp.review as Array<ReviewType>

      for (const review of reviews) {
        review.createdAt = moment(review.createdAt as Date)
      }
    }
  }

  return bootcamps
    .sort((a, b) => 0.5 - Math.random())
    .filter((e) => bootcamps.indexOf(e) < 4)
}
