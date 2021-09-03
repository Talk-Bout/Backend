import { Post } from '@prisma/client' // 이 라인이 뜻하는 바는?
import moment from '../../Infrastructures/utils/moment'
import { prisma } from '../../Infrastructures/utils/prisma'

export default async (category: string | undefined, page: number | undefined) => {
  const Post = prisma.post
  const ITEMS_PER_PAGE = 8

  type PostType = Omit<Post, 'createdAt'> & {
    createdAt: Date | string
  }

  const posts: Array<PostType> = await Post.findMany({
    where: { AND: [{ category }] },
    include: {
      postLike: true,
      user: { select: { profilePic: true } },
      postComment: true
    },
    skip: page && ((page as number) - 1) * ITEMS_PER_PAGE,
    take: page && ITEMS_PER_PAGE * 3,
    orderBy: [{ createdAt: 'desc' }]
  })

  for (const post of posts) {
    post.createdAt = moment(post.createdAt as Date)
  }

  return posts
}
