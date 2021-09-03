import moment from '../../Infrastructures/utils/moment'
import { prisma } from '../../Infrastructures/utils/prisma'

export default async (page: number) => {
  const Questions = await prisma.question
  const ITEMS_PER_POST = 12

  const questions = (await Questions.findMany({
    include: {
      questionLike: true,
      user: true,
      answer: true
    },
    skip: (page - 1) * ITEMS_PER_POST,
    take: ITEMS_PER_POST * 2
  })) as Array<any>

  for (const question of questions) {
    question.likeNumber = question.questionLike?.length
    question.createdAt = moment(question.createdAt)
    question.answerNumber = question.answer?.length
  }

  let result: Array<any> = questions

  return result.sort((a, b) => 0.5 - Math.random())
}
