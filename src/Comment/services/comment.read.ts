import { PrismaClient } from '.prisma/client'
import readValidator from '../validators/readComment.validator'
export default  (DTO : readValidator ) => {
  const Comment = new PrismaClient().comment
  return  Comment.findMany({ where:  DTO })
}
