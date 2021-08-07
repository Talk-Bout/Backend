import { prisma } from '../../Infrastructures/utils/prisma'
import readMyPostValidator from '../validators/nickname.validator'

export default async(DTO: readMyPostValidator) => {
  const User = prisma.user
  const Post = prisma.post
  const Comment = prisma.comment
 
  const {nickname} = DTO
  //await Comment.deleteMany({where: {nickname}})
  //await Post.deleteMany({where: {nickname}})

  return User.delete({ where: DTO })
}

