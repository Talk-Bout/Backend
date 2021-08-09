import { prisma } from '../../Infrastructures/utils/prisma'
import NicknameValidator from '../validators/Nickname.validator'

export default async (DTO: NicknameValidator) => {
  const User = prisma.user
  return User.delete({ where: DTO })
}
