import { PrismaClient } from '@prisma/client'
import updatePostValidator from '../validators/updatePost.validator'

export default (DTO: updatePostValidator) => {
  const Post = new PrismaClient().post
  return Post.update({
    where: {
      postId: DTO.postId
    },
    data: {
      content: DTO.content,
      title: DTO.title,
      category: DTO.category
    }
  })
}
