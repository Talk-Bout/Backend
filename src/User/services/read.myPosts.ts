import { prisma } from '../../Infrastructures/utils/prisma'
import { NicknameValidator } from '../validators'

export default (nickname: NicknameValidator) => {
  const Post = prisma.post
  return Post.findMany({ 
    where: nickname,
    orderBy: [{ createdAt: 'desc' }] 
  })
}
