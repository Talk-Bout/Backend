import { prisma } from '../../Infrastructures/utils/prisma'
import moment from '../../Infrastructures/utils/moment'
import { Question, QuestionLike, QuestionBookmark, User, Answer } from '@prisma/client'

export default async (page: number) => {
  const Question = prisma.question
  const ITEMS_PER_PAGE = 12

  type QuestionType = Omit<Question, 'createdAt'> & {
    createdAt: Date | string
    questionLike: Array<QuestionLike>
    answer: Array<Answer>
    questionBookmark: Array<QuestionBookmark>
    user?: Pick<User, 'profilePic'> | null
    profilePic?: User['profilePic'] | null
    likeNumber?: number
    answerNumber?: number
  }

  const questions: Array<QuestionType> = await Question.findMany({
    skip: (page - 1) * ITEMS_PER_PAGE,
    include: {
      questionLike: true,
      answer: true,
      questionBookmark: true,
      user: { select: { profilePic: true } }
    },
    take: ITEMS_PER_PAGE * 3,
    orderBy: [{ createdAt: 'desc' }]
  })

  for (const question of questions) {
    question.createdAt = moment(question.createdAt as Date)
    question.answerNumber = question.answer.length
  }

  return questions
}
