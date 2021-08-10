import { prisma } from '../../Infrastructures/utils/prisma'
import deleteBookmarkValidator from '../validators/deleteBookmark.validator'

export default (DTO: deleteBookmarkValidator) => {
  const Bookmark = prisma.bootcampBookmark
  return Bookmark.delete({ where: DTO })
}
