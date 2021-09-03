import { prisma } from '../../Infrastructures/utils/prisma'

export default async function (postCommentId: number, user: string) {
  const PostComment = prisma.postComment

  const isTheUser = await PostComment.findFirst({
    where: {
      postCommentId,
      nickname: user
    }
  })

  return isTheUser
    ? PostComment.delete({ where: { postCommentId } })
    : { isDeleted: false }
}
