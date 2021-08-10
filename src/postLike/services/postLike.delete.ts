import { prisma } from '../../Infrastructures/utils/prisma'
import deleteLikeValidator from '../validators/deletePostLike.validator'

export default (DTO: deleteLikeValidator) => {
  const postLike = prisma.postLike
  return postLike.delete({ where: DTO })
}
