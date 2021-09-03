import { prisma } from '../../Infrastructures/utils/prisma'

export default async (nickname: object, requestObject: any) => {
  const User = prisma.user
  await prisma.feedback.create({ data: requestObject })
  return User.delete({ where: nickname })
}
