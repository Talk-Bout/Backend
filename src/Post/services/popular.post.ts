import moment from '../../Infrastructures/utils/moment'
import { prisma } from '../../Infrastructures/utils/prisma'
import { Post, PostLike, User } from '@prisma/client'

export default async (category: string | undefined, page: number | undefined) => {
  const Post = prisma.post
  const ITEMS_PER_POST = 12

  type PostType = Omit<Post, 'createdAt'> & {
    createdAt: Date | string
    postLike: Array<PostLike>
    user: User | null
    likeNumber?: number
  }

  const posts: Array<PostType> = await Post.findMany({
    where: { AND: [{ category }] },
    include: {
      postLike: true,
      user: true
    },
    skip: page && ((page as number) - 1) * ITEMS_PER_POST,
    take: page && ITEMS_PER_POST * 2
  })

  for (const post of posts) {
    post.likeNumber = post.postLike.length
    post.createdAt = moment(post.createdAt as Date)
  }

  return posts.sort(
    (a: any, b: any) =>
      (b.likeNumber + 1) * (b.viewCount + 1) - (a.likeNumber + 1) * (a.viewCount + 1)
  )
}
