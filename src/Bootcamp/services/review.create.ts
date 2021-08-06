import { prisma } from '../../Infrastructures/utils/prisma'
import createReviewValidator from '../validators/createReview.validator'

export default async function (DTO: createReviewValidator) {
  const Review = prisma.review
  return Review.create({ data: DTO })
}
