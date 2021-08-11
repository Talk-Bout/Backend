import { prisma } from '../../Infrastructures/utils/prisma'
import createLikeValidator from '../validators/createQuestionJunction.validator'

export default (DTO: createLikeValidator) => {
  const QuestionLike = prisma.questionLike
  return QuestionLike.create({ data: DTO })
}
