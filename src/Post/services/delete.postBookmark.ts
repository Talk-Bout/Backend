import { prisma } from '../../Infrastructures/utils/prisma'

export default (postBookmarkId: number) => {
  const postBookmark = prisma.postBookmark
  return postBookmark.delete({ where: { postBookmarkId }})
}