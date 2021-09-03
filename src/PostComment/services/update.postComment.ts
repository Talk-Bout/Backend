import moment from '../../Infrastructures/utils/moment'
import { prisma } from '../../Infrastructures/utils/prisma'
import { PostComment } from '@prisma/client'
import { UpdatePostCommentValidator } from '../validators'

export default async function (
  postCommentId: number,
  user: string,
  requestObject: UpdatePostCommentValidator
) {
  const PostComment = prisma.postComment

  type PostCommentType = Omit<PostComment, 'createdAt'> & {
    createdAt: Date | string
  }

  const isTheUser = await PostComment.findFirst({
    where: { postCommentId, nickname: user }
  })

  if (isTheUser) {
    const postComment: PostCommentType = await PostComment.update({
      where: { postCommentId },
      data: requestObject
    })

    postComment.createdAt = moment(postComment.createdAt as Date)

    return postComment
  } else {
    return { isUpdated: false }
  }
}
