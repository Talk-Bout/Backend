import { prisma } from '../../Infrastructures/utils/prisma'
import createAnswerValidator from '../validators/createAnswer.validator'

export default (DTO: createAnswerValidator) => {
  const Answer = prisma.answer
  return Answer.create({ data: DTO })
}
