import { prisma } from '../../Infrastructures/utils/prisma'
import { PostJunctionValidator } from '../validators'

export default (requestObject: PostJunctionValidator) => {
  const postBookmark = prisma.postBookmark
  return postBookmark.delete({
    where: {
      postId_nickname: requestObject
    }
  })
}
