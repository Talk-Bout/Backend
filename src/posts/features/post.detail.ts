
import { PrismaClient } from '@prisma/client'

export default async (DTO: number) => {
  const Post = new PrismaClient().post

  return await Post.findUnique({
    where:{ 
        postId: DTO 
    }, 
  })
}
