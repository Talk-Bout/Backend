import { prisma } from '../../Infrastructures/utils/prisma'
import CreateCommunityValidator from '../validators/createCommunity.validator'

export default async function (DTO: CreateCommunityValidator) {
  const Review = prisma.community
  return Review.create({ data: DTO })
}
