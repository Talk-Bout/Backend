import { prisma } from '../../Infrastructures/utils/prisma'
import { PostComment } from '../interfaces/interface'
import moment from '../../Infrastructures/utils/moment'

export default async function (postId: number, page: number) {
  const PostComment = prisma.postComment
  const ITEMS_PER_PAGE = 5

  const comments = (await PostComment.findMany({
    where: { postId },
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
    orderBy: [{ createdAt: 'desc' }]
  })) as Array<PostComment>

  return comments.map((PostComment) => {
    PostComment.createdAt = moment(PostComment.createdAt as Date)
    return comments
  })
}
