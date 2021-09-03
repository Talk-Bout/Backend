import moment from '../../Infrastructures/utils/moment'
import { prisma } from '../../Infrastructures/utils/prisma'
import { Question } from '@prisma/client'
import { UpdateQuestionValidator } from '../validators'

export default async (
  questionId: number,
  user: string,
  requestObject: UpdateQuestionValidator
) => {
  const Question = prisma.question

  type QuestionType = Omit<Question, 'createdAt'> & {
    createdAt: Date | string
  }

  const isTheUser = await Question.findFirst({
    where: {
      questionId,
      nickname: user
    }
  })

  if (isTheUser) {
    const question: QuestionType = await Question.update({
      where: { questionId },
      data: requestObject
    })

    question.createdAt = moment(question.createdAt as Date)

    return question
  } else {
    return { isUpdated: false }
  }
}
