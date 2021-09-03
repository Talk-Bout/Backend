import { prisma } from '../../Infrastructures/utils/prisma'

export default async (postId: number, user: string) => {
  const Post = prisma.post

  const isTheUser = await Post.findFirst({
    where: {
      postId,
      nickname: user
    }
  })

  return isTheUser ? Post.delete({ where: { postId } }) : { isDeleted: false }
}
