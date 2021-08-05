import { prisma } from '../../Infrastructures/utils/prisma'
import readNicknameValidator from '../validators/readNickname.validator'

export default (DTO: readNicknameValidator) => {
  const User = prisma.user
  return User.findUnique({ where: DTO })
}