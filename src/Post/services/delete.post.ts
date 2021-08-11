import { prisma } from '../../Infrastructures/utils/prisma'

export default (postId: number) => {
  const Post = prisma.post
  return Post.delete({ where: { postId }})
}
