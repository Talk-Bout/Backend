import { Question, QuestionBookmark } from '@prisma/client'
import moment from '../../Infrastructures/utils/moment'
import { prisma } from '../../Infrastructures/utils/prisma'

export default async (nickname: object) => {
  const QuestionBookmarks = prisma.questionBookmark

  type QuestionBookmarkType = QuestionBookmark & {
    question?: Question | null
  }

  type QuestionType = Omit<Question, 'createdAt'> & {
    createdAt: Date | string
  }

  const bookmarks: Array<QuestionBookmarkType> = await QuestionBookmarks.findMany({
    where: nickname,
    include: { question: { include: { user: true } } }
  })

  for (const bookmark of bookmarks) {
    if (bookmark.question) {
      const question = bookmark.question as QuestionType
      question.createdAt = moment(question.createdAt as Date)
    }
  }

  return bookmarks
}
