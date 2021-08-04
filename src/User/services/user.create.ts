import { PrismaClient } from '@prisma/client'
import createUserValidator from '../validators/createUser.validator'

export default (DTO: createUserValidator) => {
  const User = new PrismaClient().user
  return User.create({ data: DTO })
}
