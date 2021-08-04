import { PrismaClient } from '@prisma/client'
import deleteBookmarkValidator from '../validators/deleteBookmark.validator'

export default (DTO: deleteBookmarkValidator) => {
  const Bookmark = new PrismaClient().bookmark
  return Bookmark.delete({ where: DTO })
}
