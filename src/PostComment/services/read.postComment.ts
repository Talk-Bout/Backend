import { prisma } from '../../Infrastructures/utils/prisma'

export default async function (postId: number, page: number) {
  const PostComment = prisma.postComment
  const ITEMS_PER_PAGE = 5

  return PostComment.findMany({
    where: { postId },
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
    orderBy: [{ createdAt: 'desc' }]
  })
}
