import { prisma } from '../../Infrastructures/utils/prisma'
import { CreateAnswerValidator } from '../validators'

export default (DTO: CreateAnswerValidator) => {
  const Answer = prisma.answer
  return Answer.create({ data: DTO })
}
