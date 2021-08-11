import { prisma } from '../../Infrastructures/utils/prisma'
import { CreateAnswerJunctionValidator } from '../validators'

export default (DTO: CreateAnswerJunctionValidator) => {
  const AnswerLike = prisma.answerLike
  return AnswerLike.create({ data: DTO })
}