import { PrismaClient } from '@prisma/client'
import createValidator from '../validators/createComment.validator'

export default (DTO: createValidator) => {
  const Comment = new PrismaClient().comment
  return Comment.create({ data : DTO })
}
