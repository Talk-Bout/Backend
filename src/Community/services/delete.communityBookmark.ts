import { prisma } from '../../Infrastructures/utils/prisma'

export default (communityBookmarkId: number) => {
  const Bookmark = prisma.communityBookmark
  return Bookmark.delete({ where: { communityBookmarkId }})
}
