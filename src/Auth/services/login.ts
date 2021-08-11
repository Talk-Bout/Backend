import { prisma } from '../../Infrastructures/utils/prisma'
import loginValidator from '../validators/login.validator'

export default (DTO: loginValidator) => {
  const User = prisma.user
  return User.findFirst({ where: DTO })
}
