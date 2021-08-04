import { PrismaClient } from '@prisma/client'
import readDetailValidator from '../validators/readDetail.validator'

export default (DTO: readDetailValidator) => {
  const Post = new PrismaClient().post
  return Post.findUnique({ 
    where: DTO, 
    include: { like: true }
  })
}
