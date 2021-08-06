import { prisma } from '../../Infrastructures/utils/prisma'
import readDetailValidator from '../validators/readDetail.validator'

export default (DTO: readDetailValidator) => {
  const Post = prisma.post


  const targetPost = Post.update({
    where:{postId: DTO.postId},
    data:{
      viewCount:{
        increment:1,
      },
    }
  })
  return targetPost
}