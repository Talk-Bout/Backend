import { prisma } from '../../Infrastructures/utils/prisma'
import createPostValidator from '../validators/createPost.validator'

export default (DTO: createPostValidator) => {
  const Post = prisma.post
  return Post.create({ data: DTO })
}
