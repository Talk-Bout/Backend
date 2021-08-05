import { prisma } from '../../Infrastructures/utils/prisma'
import readMyPostValidator from '../validators/readNickname.validator'

export default (DTO: readMyPostValidator) => {
  const Post = prisma.post
  return Post.findMany({ where: DTO })
}