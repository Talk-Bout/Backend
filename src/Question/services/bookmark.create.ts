import { prisma } from '../../Infrastructures/utils/prisma'
import createBookmarkValidator from '../validators/createQuestionBookmark.validator'

export default (DTO: createBookmarkValidator) => {
  const Bookmark = prisma.questionBookmark
  return Bookmark.create({ data: DTO })
}
