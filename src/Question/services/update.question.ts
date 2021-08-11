import { prisma } from '../../Infrastructures/utils/prisma'
import { UpdateQuestionValidator } from '../validators'

export default (questionId: number, DTO: UpdateQuestionValidator) => {
  const Question = prisma.question
  return Question.update({
    where: { questionId },
    data: DTO
  })
}
