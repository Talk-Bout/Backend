import { PrismaClient } from '@prisma/client'
import readEmailValidator from '../validators/readEmail.validator'

export default (DTO: readEmailValidator) => {
  const User = new PrismaClient().user
  return User.findUnique({ where: DTO })
}