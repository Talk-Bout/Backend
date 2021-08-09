import { prisma } from '../../Infrastructures/utils/prisma'
import deletePostValidator from '../validators/deletePost.validator'

export default (DTO: deletePostValidator) => {
  const Post = prisma.post
  return Post.delete({ where: DTO })
}