import { prisma } from '../../Infrastructures/utils/prisma'
import createBookmarkValidator from '../validators/createCommunityBookmark.validator'

export default (DTO: createBookmarkValidator) => {
  const Bookmark = prisma.communityBookmark
  return Bookmark.create({ data: DTO })
}
