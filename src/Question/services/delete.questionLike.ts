import { prisma } from '../../Infrastructures/utils/prisma'

export default (questionLikeId: number) => {
  const QuestionLike = prisma.questionLike
  return QuestionLike.delete({ where: { questionLikeId }})
}
