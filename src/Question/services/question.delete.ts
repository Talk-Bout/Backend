import { prisma } from '../../Infrastructures/utils/prisma'
import deleteQuestionValidator from '../validators/deleteDetail.validator'

export default (DTO: deleteQuestionValidator) => {
  const Question = prisma.question
  return Question.delete({ where: DTO })
}
