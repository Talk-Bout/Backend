
import { PrismaClient } from '@prisma/client'

export default async (DTO: string) => {
  const Post = new PrismaClient().post

  return await Post.findMany({
    where:{ 
        nickname: DTO 
    }, 
  })
}
