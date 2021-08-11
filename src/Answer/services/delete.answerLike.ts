import { prisma } from '../../Infrastructures/utils/prisma'

export default (answerLikeId: number) => {
  const AnswerLike = prisma.answerLike
  return AnswerLike.delete({ where: { answerLikeId }})
}