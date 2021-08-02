import UpdatedPost from '../../interfaces/updatedpost.interface'
import { PrismaClient } from '@prisma/client'

export default async (DTO: UpdatedPost) => {
  const Post = new PrismaClient().post

  return await Post.update({
    where:{ 
        postId: DTO.postId
    }, 
    data:{
        content: DTO.content
    }
  })
}
