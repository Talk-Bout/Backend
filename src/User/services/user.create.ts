import { prisma } from '../../Infrastructures/utils/prisma'
import createUserValidator from '../validators/createUser.validator'

// export default (DTO: createUserValidator) => {
//   const User = prisma.user
//   return User.create({ data: DTO })
// }

export default async(DTO: createUserValidator) => {
  const User = prisma.user
  return User.create({ data: DTO })
}