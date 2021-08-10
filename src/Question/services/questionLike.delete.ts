import { prisma } from '../../Infrastructures/utils/prisma'
import deleteLikeValidator from '../validators/deleteLike.validator'

export default (DTO: deleteLikeValidator) => {
  const QuestionLike = prisma.questionLike
  return QuestionLike.delete({ where: DTO })
}
