import { prisma } from '../../Infrastructures/utils/prisma'
import { QuestionJunctionValidator } from '../validators'

export default (requestObject: QuestionJunctionValidator) => {
  const QuestionLike = prisma.questionLike
  return QuestionLike.delete({ where: { questionId_nickname: requestObject } })
}
