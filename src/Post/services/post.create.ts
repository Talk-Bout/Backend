import { PrismaClient } from '@prisma/client'
import createPostValidator from '../validators/createPost.validator'

export default (DTO: createPostValidator) => {
  const Post = new PrismaClient().post
  return Post.create({ data: DTO })
}
