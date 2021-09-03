import { prisma } from '../../Infrastructures/utils/prisma'

export default (nickname: object) => {
  const User = prisma.user
  return User.findUnique({ where: nickname })
}
