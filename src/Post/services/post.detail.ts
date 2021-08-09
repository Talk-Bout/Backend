import { prisma } from '../../Infrastructures/utils/prisma'
import readDetailValidator from '../validators/readDetail.validator'

export default (DTO: readDetailValidator) => {
  const Post = prisma.post
  return Post.findUnique({
    where: DTO,
    include: { postLike: true }
  })
}
