import { prisma } from '../../Infrastructures/utils/prisma'

export default () => {
  const Answer = prisma.answer
  return Answer.findMany({})
}