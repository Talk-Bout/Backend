
import { PrismaClient } from '@prisma/client'

export default async (DTO: number) => {
  const Post = new PrismaClient().post
  const Comment = new PrismaClient().comment
  await Comment.deleteMany({
    where:{
      postId: DTO
    },
  })
  return await Post.delete({
    where:{ 
        postId: DTO 
    }, 
  })
}
