import { prisma } from '../../Infrastructures/utils/prisma'
import moment from '../../Infrastructures/utils/moment'
import { Answer, AnswerLike, User } from '.prisma/client'

export default async (questionId: number, page: number) => {
  const Answer = prisma.answer
  const ITEMS_PER_PAGE = 5

  type AnswerDTO = Omit<Answer, 'createdAt'> & {
    createdAt: Date | string
    answerLike: Array<AnswerLike>
    user?: Pick<User, 'profilePic'> | null
    likeNumber?: number
    profilePic?: User["profilePic"] | null
  }

  const answers: Array<AnswerDTO> = await Answer.findMany({
    where: { questionId },
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
    include: { 
      answerLike: true,
      user: { select: { profilePic: true }}
    }
  })

  for (const answer of answers) {
    answer.createdAt = moment(answer.createdAt as Date)
    answer.likeNumber = answer.answerLike.length
    
    if (answer.user) {
      answer.profilePic = answer.user.profilePic as string
      delete answer.user
    }

    if (!answer.answerLike) {
      answer.answerLike = []
    }
  }

  return answers
}
