import { PrismaClient } from '@prisma/client'
import deletePostValidator from '../validators/deletePost.validator'

export default (DTO: deletePostValidator) => {
  const Post = new PrismaClient().post
  return Post.delete({ where: DTO })
}
