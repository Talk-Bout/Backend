import { Post } from '@prisma/client'
import moment from '../../Infrastructures/utils/moment'
import { prisma } from '../../Infrastructures/utils/prisma'
import { UpdatePostValidator } from '../validators'

export default async (
  postId: number,
  user: string,
  requestObject: UpdatePostValidator
) => {
  const Post = prisma.post

  type _Post = Omit<Post, 'createdAt'> & {
    createdAt: Date | string
  }

  const isTheUser = await Post.findFirst({
    where: { postId, nickname: user }
  })

  if (isTheUser) {
    const post: _Post = await Post.update({
      where: { postId },
      data: requestObject
    })

    post.createdAt = moment(post.createdAt as Date)

    return post
  } else {
    return { isUpdated: false }
  }
}
