import { PrismaClient } from '@prisma/client'
import createLikeValidator from '../validators/createLike.validator'

export default (DTO: createLikeValidator) => {
  const Like = new PrismaClient().like
  return Like.create({ data: DTO })
}