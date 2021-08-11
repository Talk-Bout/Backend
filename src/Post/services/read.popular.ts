import { prisma } from '../../Infrastructures/utils/prisma'

export default (category: string | undefined, page: number) => {
  const Post = prisma.post
  const ITEMS_PER_PAGE = 8

  return Post.findMany({
    where: { AND: [{ category }] },
    include: { postLike: true,
               user:true },
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE * 3,
    orderBy: [{ createdAt: 'desc' }]
  })
}
