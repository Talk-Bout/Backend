import { Answer } from '@prisma/client'
import moment from '../../Infrastructures/utils/moment'
import { prisma } from '../../Infrastructures/utils/prisma'
import { CreateAnswerValidator } from '../validators'

export default async (requestObject: CreateAnswerValidator) => {
  const Answer = prisma.answer

  type AnswerType = Omit<Answer, 'createdAt'> & {
    createdAt: Date | string
  }

  const answer: AnswerType = await Answer.create({ data: requestObject })

  answer.createdAt = moment(answer.createdAt as Date)

  return answer
}
