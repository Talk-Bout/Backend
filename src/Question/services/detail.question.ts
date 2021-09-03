import moment from '../../Infrastructures/utils/moment'
import { prisma } from '../../Infrastructures/utils/prisma'
import { Question, QuestionLike, Answer, User } from '@prisma/client'

export default async (questionId: number) => {
  const Question = prisma.question

  type QuestionType = Omit<Question, 'createdAt'> & {
    createdAt: Date | string
    questionLike: Array<QuestionLike>
    answer: Array<Answer>
    user?: Pick<User, 'profilePic'> | null
    profilePic?: User['profilePic'] | null
    likeNumber?: number
    answerNumber?: number
  }

  const question: QuestionType = await Question.update({
    where: { questionId },
    include: {
      questionLike: true,
      answer: true,
      user: { select: { profilePic: true } }
    },
    data: { viewCount: { increment: 1 } }
  })

  question.createdAt = moment(question.createdAt as Date)
  question.likeNumber = question.questionLike.length
  question.answerNumber = question.answer.length

  if (question.user) {
    question.profilePic = question.user.profilePic
  }

  return question
}
