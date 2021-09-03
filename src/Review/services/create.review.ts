import moment from '../../Infrastructures/utils/moment'
import { prisma } from '../../Infrastructures/utils/prisma'
import { Prisma, Review } from '@prisma/client'
import { CreateReviewValidator } from '../validators'

export default async (requestObject: CreateReviewValidator) => {
  const Review = prisma.review

  type ReviewType = Omit<Review, 'createdAt'> & {
    createdAt: Date | string
  }

  const review: ReviewType = await Review.create({ data: requestObject })

  review.createdAt = moment(review.createdAt as Date)

  return review
}
