import { prisma } from '../../Infrastructures/utils/prisma'
import { CreatePostCommentValidator } from '../validators'

export default async function (DTO: CreatePostCommentValidator) {
  const PostComment = prisma.postComment
  return PostComment.create({ data: DTO })
}
