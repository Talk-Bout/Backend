import { prisma } from '../../Infrastructures/utils/prisma'
import readEmailValidator from '../validators/readEmail.validator'

export default (DTO: readEmailValidator) => {
  const User = prisma.user
  return User.findUnique({ where: DTO })
}