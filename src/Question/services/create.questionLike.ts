import { prisma } from '../../Infrastructures/utils/prisma'
import createLikeValidator from '../validators/QuestionJunction.validator'

export default (requestObject: createLikeValidator) => {
  const QuestionLike = prisma.questionLike
  return QuestionLike.create({ data: requestObject })
}
