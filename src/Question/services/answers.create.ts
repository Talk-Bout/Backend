import { prisma } from '../../Infrastructures/utils/prisma'
import createAnswerValidator from '../validators/createAnswers.validator'

export default (DTO: createAnswerValidator) => {
  const Answer = prisma.answer
  return Answer.create({ data: DTO })
}
