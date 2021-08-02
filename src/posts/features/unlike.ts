
import like from '../../interfaces/like'
import { PrismaClient } from '@prisma/client'

export default async (DTO: like) => {
  const Like = new PrismaClient().like

  return await Like.delete({
    where:{
      postId: DTO.postId,
      nickname: DTO.nickname
    }
  
    
  })
}
