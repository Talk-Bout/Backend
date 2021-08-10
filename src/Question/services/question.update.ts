import { prisma } from '../../Infrastructures/utils/prisma'
import updateQuestionValidator from '../validators/updateQuestion.validator'

export default (DTO: updateQuestionValidator) => {
  const Question = prisma.question
  return Question.update({
    where: {
      questionId: DTO.questionId
    },
    data: {
      content: DTO.content,
      title: DTO.title,
    }
  })
}
