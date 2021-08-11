import { prisma } from '../../Infrastructures/utils/prisma'
import { CreateQuestionJunctionValidator } from '../validators'

export default (DTO: CreateQuestionJunctionValidator) => {
  const Bookmark = prisma.questionBookmark
  return Bookmark.create({ data: DTO })
}
