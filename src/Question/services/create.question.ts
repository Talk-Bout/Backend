import { prisma } from '../../Infrastructures/utils/prisma'
import createQuestionValidator from '../validators/createQuestion.validator'

export default (DTO: createQuestionValidator) => {
  const Question = prisma.question
  return Question.create({ data: DTO })
}
