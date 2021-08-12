import { prisma } from '../../Infrastructures/utils/prisma'
import { DeleteUserValidator } from '../validators'

export default async (DTO: DeleteUserValidator) => {
  const User = prisma.user
  await prisma.feedback.create({ data: DTO })
  return User.delete({ where: { nickname: DTO.nickname } })
}
