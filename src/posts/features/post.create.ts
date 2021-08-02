import Post from '../../interfaces/post.interface'
import { PrismaClient } from '@prisma/client'

export default async (DTO: Post) => {
  const User = new PrismaClient().post

  return await User.create({
    data: DTO
  })
}
