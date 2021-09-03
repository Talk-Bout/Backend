import { prisma } from '../../Infrastructures/utils/prisma'
import { AnswerJunctionValidator } from '../validators'

export default (requestObject: AnswerJunctionValidator) => {
  const AnswerLike = prisma.answerLike
  return AnswerLike.create({ data: requestObject })
}
