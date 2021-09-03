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

  const bootcamp: BootcampType = (await Bootcamp.findUnique({
    include: { review: true },
    where: { bootcampName }
  })) as BootcampType

  bootcamp.star = averageStars(bootcamp.review)
  bootcamp.reviewNumber = bootcamp.review.length

  for (const review of bootcamp.review as Array<ReviewType>) {
    review.createdAt = moment(review.createdAt as Date)
  }

  return bootcamp
}
