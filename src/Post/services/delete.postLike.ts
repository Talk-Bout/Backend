import { prisma } from '../../Infrastructures/utils/prisma'
import { PostJunctionValidator } from '../validators'

export default (requestObject: PostJunctionValidator) => {
  const postLike = prisma.postLike

  return postLike.delete({
    where: {
      postId_nickname: requestObject
    }
  })
}
