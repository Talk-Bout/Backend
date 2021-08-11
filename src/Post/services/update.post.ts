import { prisma } from '../../Infrastructures/utils/prisma'
import { UpdatePostValidator } from '../validators'

export default (postId: number, DTO: UpdatePostValidator) => {
  const Post = prisma.post
  return Post.update({
    where: { postId },
    data: DTO
  })
}
