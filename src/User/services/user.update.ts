import { prisma } from '../../Infrastructures/utils/prisma'
import updateUserValidator from '../validators/updateUser.validator'

export default async (DTO: updateUserValidator) => {
  const User = prisma.user
  const Profile = prisma.profile

  
  const user = await User.update({
    where: {
      email: DTO.email
    },
    data: {
      password: DTO.password,
      nickname: DTO.nickname,
      // add profile pic
    }
  })

  
  return user 
}
