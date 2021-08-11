import { prisma } from '../../Infrastructures/utils/prisma'

export default (questionId: number) => {
  const Question = prisma.question
  return Question.delete({ where: { questionId }})
}
