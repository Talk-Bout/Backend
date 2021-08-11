import { prisma } from '../../Infrastructures/utils/prisma'

export default async function (postCommentId: number) {
  const PostComment = prisma.postComment
  return PostComment.delete({ where: { postCommentId }})
}
