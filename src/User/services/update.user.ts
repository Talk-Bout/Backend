import { prisma } from '../../Infrastructures/utils/prisma'
import { UpdateUserValidator } from '../validators'

export default (DTO: UpdateUserValidator) => {
  const User = prisma.user
  return User.update({
    where: { nickname: DTO.nickname },
    data: DTO
  })
}
