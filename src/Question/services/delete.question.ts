import { prisma } from '../../Infrastructures/utils/prisma'

export default async (questionId: number, user: string) => {
  const Question = prisma.question

  const isTheUser = await Question.findFirst({
    where: {
      questionId,
      nickname: user
    }
  })

  return isTheUser ? Question.delete({ where: { questionId } }) : { deleted: false }
}
