import { PrismaClient } from '@prisma/client'
import readBookmarkValidator from '../validators/readBookmark.validator'

export default (DTO: readBookmarkValidator) => {
  const Bookmark = new PrismaClient().bookmark
  return Bookmark.findMany({ where: DTO })
}
