import { prisma } from '../../Infrastructures/utils/prisma'
import readReviewValidator from '../validators/readReview.validator'

export default (DTO: readReviewValidator) => {
  const Review = prisma.review
  return Review.findMany({ where: DTO })
}
