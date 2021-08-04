import { PrismaClient } from '.prisma/client'

export default  (DTO: any) => {
  const Comment = new PrismaClient().comment
  return Comment.delete({ where: DTO })
}
