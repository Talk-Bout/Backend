import { prisma } from '../../Infrastructures/utils/prisma'
import { CreateCommunityValidator } from '../validators'

export default async function (DTO: CreateCommunityValidator) {
  const Review = prisma.community
  return Review.create({ data: DTO })
}
