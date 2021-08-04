import { PrismaClient } from '.prisma/client'
import loginValidator from '../validators/login.validator'

export default (DTO: loginValidator) => {
  const User = new PrismaClient().user
  return User.findFirst({ where: DTO })
}
