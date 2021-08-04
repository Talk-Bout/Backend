import { PrismaClient } from '@prisma/client'
import createBookmarkValidator from '../validators/createBookmark.validator'

export default (DTO: createBookmarkValidator) => {
  const Bookmark = new PrismaClient().bookmark
  return Bookmark.create({ data: DTO })
}
