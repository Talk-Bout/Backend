import { prisma } from '../../Infrastructures/utils/prisma'
import { NicknameValidator } from '../validators'

export default async (nickname: NicknameValidator) => {
  const User = prisma.user
  return User.delete({ where: nickname })
}
