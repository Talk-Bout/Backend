import { prisma } from '../../Infrastructures/utils/prisma'

export default (page: number) => {
  const Answer = prisma.answer
  const ITEMS_PER_PAGE = 5

 
  return Answer.findMany({
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
    include: { answerLike: true }
  })






}
