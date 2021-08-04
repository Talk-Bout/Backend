import { PrismaClient } from '@prisma/client'
import readPostValidator from '../validators/readPost.validator'

export default (DTO: readPostValidator) => {
  const Post = new PrismaClient().post
  return Post.findMany({ where: DTO })
}
