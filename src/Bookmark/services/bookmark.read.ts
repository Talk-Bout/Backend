import { prisma } from '../../Infrastructures/utils/prisma'
import readBookmarkValidator from '../validators/readBookmark.validator'

export default (DTO: readBookmarkValidator) => {
  const Bookmark = prisma.bookmark
  return Bookmark.findMany({ where: DTO })
}
