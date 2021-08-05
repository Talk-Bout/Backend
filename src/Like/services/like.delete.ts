import { prisma } from '../../Infrastructures/utils/prisma'
import deleteLikeValidator from '../validators/deleteLike.validator'

export default (DTO: deleteLikeValidator) => {
  const Like = prisma.postLike
  return Like.delete({ where :  DTO  })
}