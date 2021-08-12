import { prisma } from '../../Infrastructures/utils/prisma'
import { Post } from '../interfaces/interface'
import moment from '../../Infrastructures/utils/moment'

export default async (category: string | undefined, page: number) => {
  const Post = prisma.post
  const ITEMS_PER_PAGE = 8

  const posts = (await Post.findMany({
    where: { AND: [{ category }] },
    include: { postLike: true },
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
    orderBy: [{ createdAt: 'desc' }]
  })) as Array<Post>

  return posts.map((post) => {
    post.createdAt = moment(post.createdAt as Date)
    return post
  })
}
