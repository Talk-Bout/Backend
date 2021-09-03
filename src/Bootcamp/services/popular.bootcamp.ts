import { Bootcamp, Review } from '@prisma/client'
import { prisma } from '../../Infrastructures/utils/prisma'

export default async () => {
  const Bootcamp = prisma.bootcamp

  type BootcampType = Bootcamp & {
    star?: number
    review: Array<Review>
  }

  let bootcamps: Array<BootcampType> = await Bootcamp.findMany({
    include: { review: true }
  })

  for (const bootcamp of bootcamps) {
    let stars = 0
    const reviews = bootcamp.review

    if (reviews.length) {
      for (const review of reviews) {
        stars += review.stars
      }
      if (reviews.length > 1) {
        bootcamp.star = stars / (reviews.length - 1)
      } else {
        bootcamp.star = 0
      }
    } else {
      bootcamp.star = 0
    }
  }

  return bootcamps.sort((a, b) => 0.5 - Math.random())
}
