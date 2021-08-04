import { PrismaClient } from '@prisma/client'
import readMyPostValidator from '../validators/readNickname.validator'

export default (DTO: readMyPostValidator) => {
  const Post = new PrismaClient().post
  return Post.findMany({ where: DTO })
}