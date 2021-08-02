import User from '../../interfaces/user.interface'
import { PrismaClient } from '@prisma/client'

export default async (DTO: User) => {
  const User = new PrismaClient().user

  return await User.create({
    data: DTO
  })
}
