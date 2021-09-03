import moment from '../../Infrastructures/utils/moment'
import { prisma } from '../../Infrastructures/utils/prisma'
import { Question } from '@prisma/client'
import createQuestionValidator from '../validators/createQuestion.validator'

export default async (requestObject: createQuestionValidator) => {
  const Question = prisma.question

  type QuestionType = Omit<Question, 'createdAt'> & {
    createdAt: Date | string
  }

  const question: QuestionType = await Question.create({ data: requestObject })

  question.createdAt = moment(question.createdAt as Date)

  return question
}
