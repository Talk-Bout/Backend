import { prisma } from '../../Infrastructures/utils/prisma'
import readMyPostValidator from '../validators/Nickname.validator'

export default (DTO: readMyPostValidator) => {
  const Post = prisma.bookmark
  return Post.findMany({ where: DTO })
}
