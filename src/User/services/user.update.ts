import { prisma } from '../../Infrastructures/utils/prisma'
import updateUserValidator from '../validators/updateUser.validator'

export default async (DTO: updateUserValidator) => {
  const User = prisma.user

  const user = await User.update({
    where: {
      nickname: DTO.nickname
    },
    data: {
      password: DTO.password,
      nickname: DTO.nickname,
      profilePic: DTO.profilePic,
      role: DTO.role
    }
  })

  return user
}
