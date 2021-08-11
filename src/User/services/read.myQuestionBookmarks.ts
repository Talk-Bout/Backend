import { prisma } from '../../Infrastructures/utils/prisma'
import { NicknameValidator } from '../validators'

export default (nickname: NicknameValidator) => {
  const QuestionBookmark = prisma.questionBookmark
  return QuestionBookmark.findMany({ where: nickname })
}