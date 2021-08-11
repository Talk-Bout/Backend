import { prisma } from '../../Infrastructures/utils/prisma'
import { NicknameValidator } from '../validators'

export default (nickname: NicknameValidator) => {
  const User = prisma.user
  return User.findUnique({ where: nickname })
}
