import { prisma } from '../../Infrastructures/utils/prisma'
import { Post } from '@prisma/client'
import moment from '../../Infrastructures/utils/moment'

export default async (postId: number) => {
  const Post = prisma.post

  type PostType = Omit<Post, 'createdAt'> & {
    createdAt: Date | string
  }

  const post: PostType = await Post.update({
    where: { postId },
    include: {
      postLike: true,
      user: { select: { profilePic: true } },
      postComment: true,
      postBookmark: true
    },
    data: { viewCount: { increment: 1 } }
  })

  post.createdAt = moment(post.createdAt as Date)

  return post
}
