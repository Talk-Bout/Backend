import { prisma } from '../../Infrastructures/utils/prisma'
import deleteCommentValidator from '../validators/deleteComment.validator'

export default async function (DTO: deleteCommentValidator) {
  const Comment = prisma.comment
  return Comment.delete({ where: DTO })
}
