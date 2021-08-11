import { prisma } from '../../Infrastructures/utils/prisma'

export default (postId: number) => {
  const Post = prisma.post
  return Post.update({
    where: { postId },
    include: { postLike: true,
               user:true },
    data: {
      viewCount: {
        increment: 1
      }
    }
  })
}
