import { prisma } from '../../Infrastructures/utils/prisma'
import createLikeValidator from '../validators/createLike.validator'

export default (DTO: createLikeValidator) => {
  const QuestionLike = prisma.questionLike
  return QuestionLike.create({ data: DTO })
}
