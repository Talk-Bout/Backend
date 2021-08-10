import { prisma } from '../../Infrastructures/utils/prisma'
import deleteBookmarkValidator from '../validators/deleteCommunityBookmark.validator'

export default (DTO: deleteBookmarkValidator) => {
  const Bookmark = prisma.communityBookmark
  return Bookmark.delete({ where: DTO })
}
