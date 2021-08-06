import { prisma } from '../../Infrastructures/utils/prisma'
import createCommentValidator from '../validators/createComment.validator'

export default async function (DTO: createCommentValidator) {
  const Comment = prisma.comment
  return Comment.create({ data: DTO })
}
