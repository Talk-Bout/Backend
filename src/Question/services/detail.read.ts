import { prisma } from '../../Infrastructures/utils/prisma'
import readDetailValidator from '../validators/readDetail.validator'

export default async (DTO: readDetailValidator) => {
  const Detail = prisma.question
  const questionDetail = await Detail.update({
    where: DTO,
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
