import { PrismaClient } from '@prisma/client'
import deleteLikeValidator from '../validators/deleteLike.validator'

export default (DTO: deleteLikeValidator) => {
  const Like = new PrismaClient().like
  return Like.delete({ where: DTO })
}