import { prisma } from '../../Infrastructures/utils/prisma'
import updatePostValidator from '../validators/updatePost.validator'

export default (DTO: updatePostValidator) => {
  const Post = prisma.post
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
