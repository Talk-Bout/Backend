import { prisma } from '../../Infrastructures/utils/prisma'
import { UpdateUserValidator } from '../validators'

export default (user: string, requestObject: UpdateUserValidator) => {
  const User = prisma.user
  return User.update({
    where: { nickname: user },
    data: requestObject
  })
}
