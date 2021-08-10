import { prisma } from '../../Infrastructures/utils/prisma'
import readDetailValidator from '../validators/readDetail.validator'

export default (DTO: readDetailValidator) => {
  const Post = prisma.post
  return Post.update({
    where: DTO,
    include: { postLike: true },
    data: {
      viewCount: {
        increment: 1
      }
    }
  })
}
