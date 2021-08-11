import { prisma } from '../../Infrastructures/utils/prisma'

export default (questionBookmarkId: number) => {
  const Bookmark = prisma.questionBookmark
  return Bookmark.delete({ where: { questionBookmarkId }})
}
