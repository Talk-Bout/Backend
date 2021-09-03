import { prisma } from '../../Infrastructures/utils/prisma'
import { QuestionJunctionValidator } from '../validators'

export default (requestObject: QuestionJunctionValidator) => {
  const Bookmark = prisma.questionBookmark
  return Bookmark.create({ data: requestObject })
}
