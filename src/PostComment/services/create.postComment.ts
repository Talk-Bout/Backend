import moment from '../../Infrastructures/utils/moment'
import { prisma } from '../../Infrastructures/utils/prisma'
import { PostComment } from '@prisma/client'
import { CreatePostCommentValidator } from '../validators'

export default async function (requestObject: CreatePostCommentValidator) {
  const PostComment = prisma.postComment

  type PostCommentType = Omit<PostComment, 'createdAt'> & {
    createdAt: Date | string
  }

  const postComment: PostCommentType = await PostComment.create({ data: requestObject })

  postComment.createdAt = moment(postComment.createdAt as Date)

  return postComment
}
