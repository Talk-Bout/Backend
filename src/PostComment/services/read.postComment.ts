import moment from '../../Infrastructures/utils/moment'
import { PostComment } from '@prisma/client'
import { prisma } from '../../Infrastructures/utils/prisma'

export default async function (postId: number, page: number | undefined) {
  const PostComment = prisma.postComment
  const ITEMS_PER_PAGE = 5

  type PostCommentType = Omit<PostComment, 'createdAt'> & {
    createdAt: Date | string
  }

  const postComments: Array<PostCommentType> = await PostComment.findMany({
    where: { postId },
    skip: page && (page - 1) * ITEMS_PER_PAGE,
    take: page && ITEMS_PER_PAGE
  })

  for (const postComment of postComments) {
    postComment.createdAt = moment(postComment.createdAt as Date)
  }

  return postComments
}
