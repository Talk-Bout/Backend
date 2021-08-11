import { prisma } from '../../Infrastructures/utils/prisma'

export default (page: number) => {
  const Question = prisma.question
  const ITEMS_PER_PAGE = 12

  return Question.findMany({
    skip: (page - 1) * ITEMS_PER_PAGE,
    include: { 
      questionLike: true,
      answer: true 
    },
    take: ITEMS_PER_PAGE * 3,
    orderBy: [{ createdAt: 'desc' }]
  })
}