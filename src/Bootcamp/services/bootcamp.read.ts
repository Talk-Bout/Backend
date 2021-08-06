import { prisma } from '../../Infrastructures/utils/prisma'

export default () => {
  const Bootcamp = prisma.bootCamp
  return Bootcamp.findMany({
    include: {
      review: {
        select: {
          stars: true // how to get average?
        }
      }
    }
  })
}
