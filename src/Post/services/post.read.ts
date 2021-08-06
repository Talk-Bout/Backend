import { prisma } from '../../Infrastructures/utils/prisma'
import readPostValidator from '../validators/readPost.validator'

export default (DTO: readPostValidator) => {
  const Post = prisma.post
  return DTO.category ? Post.findMany({ where: DTO }) : Post.findMany({})
}
