import { prisma } from '../../Infrastructures/utils/prisma'
import deleteBookmarkValidator from '../validators/deleteQuestionBookmarks.validator'

export default (DTO: deleteBookmarkValidator) => {
  const Bookmark = prisma.questionBookmark
  return Bookmark.delete({ where: DTO })
}
