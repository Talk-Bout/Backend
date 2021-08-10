import { prisma } from '../../Infrastructures/utils/prisma'

export default async () => {
  const Bootcamp = prisma.bootCamp
  const bootcamps = await Bootcamp.findMany({
    include: {
      review: {
        select: {
          stars: true
        }
      }
    }
  })

  for (let i = 0; i < bootcamps.length; i++) {
    let star = 0
    for (let j = 0; j < bootcamps[i].review.length; j++) {
      star += bootcamps[i].review[j].stars
    }
    star = star / bootcamps[i].review.length
    bootcamps[i].review = [{ stars: Number(star.toPrecision(2)) }]
  }

  return bootcamps
}
