import { prisma } from '../../Infrastructures/utils/prisma'
import createLikeValidator from '../validators/createLike.validator'

export default (DTO: createLikeValidator) => {
  const Like = prisma.like
  return Like.create({ data: DTO })
}