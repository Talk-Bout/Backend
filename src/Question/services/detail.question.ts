import { prisma } from '../../Infrastructures/utils/prisma'

export default async (questionId: number) => {
  const Detail = prisma.question
  const questionDetail = await Detail.update({
    where: { questionId },
    include: {
      questionLike: true,
      answer: true
    },
    data: {
      viewCount: {
        increment: 1
      }
    }
  })
  const questionLikes = questionDetail?.questionLike.length
  const numberOfAnswers = questionDetail?.answer.length
  return { questionDetail, questionLikes, numberOfAnswers }
}
