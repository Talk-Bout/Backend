import { prisma } from '../../Infrastructures/utils/prisma'
import readCommentValidator from '../validators/readComment.validator'

export default async function (DTO: readCommentValidator) {
  const Comment = prisma.comment
  return Comment.findMany({ where: DTO })
}
