import { prisma } from '../../Infrastructures/utils/prisma'
import { CreatePostValidator } from '../validators'

export default (DTO: CreatePostValidator) => {
  const Post = prisma.post
  return Post.create({ data: DTO })
}
