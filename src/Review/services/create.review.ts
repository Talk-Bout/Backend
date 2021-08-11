import { prisma } from '../../Infrastructures/utils/prisma'
import { CreateReviewValidator } from '../validators'

export default function (DTO: CreateReviewValidator) {
  const Review = prisma.review
  return Review.create({ data: DTO })
}
