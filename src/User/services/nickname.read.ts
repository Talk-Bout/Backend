import { PrismaClient } from '@prisma/client'
import readNicknameValidator from '../validators/readNickname.validator'

export default (DTO: readNicknameValidator) => {
  const User = new PrismaClient().user
  return User.findUnique({ where: DTO })
}