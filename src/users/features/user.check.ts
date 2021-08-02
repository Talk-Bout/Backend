import { PrismaClient } from '@prisma/client'

export default async (DTO: string) => {
  const User = new PrismaClient().user

  return await User.findUnique({
    where: DTO.includes('@') ? { email: DTO } : { nickname: DTO }
  })
}
