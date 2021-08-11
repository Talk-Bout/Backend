import { prisma } from '../../Infrastructures/utils/prisma'

export default (postLikeId: number) => {
  const postLike = prisma.postLike
  return postLike.delete({ where: { postLikeId }})
}