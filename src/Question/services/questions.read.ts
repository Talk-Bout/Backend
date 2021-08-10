import { prisma } from '../../Infrastructures/utils/prisma'

export default () => {
  const Question = prisma.question
  return Question.findMany({})
}