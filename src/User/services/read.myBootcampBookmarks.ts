import { prisma } from '../../Infrastructures/utils/prisma'
import averageStars from '../../Infrastructures/utils/averageStars'
import { BootcampBookmark, Bootcamp, Review } from '.prisma/client'

export default async (nickname: object) => {
  const BootcampBookmark = prisma.bootcampBookmark
  type Stars = BootcampBookmark & {
    stars?: number
    bootcamp?: (Bootcamp & { review?: Review[] }) | null
  }

  const bootcampBookmarks: Stars[] = await BootcampBookmark.findMany({
    where: nickname,
    include: {
      bootcamp: {
        include: { review: true }
      }
    }
  })

  for (const bootcampBookmark of bootcampBookmarks) {
    bootcampBookmark.stars = averageStars(
      bootcampBookmark.bootcamp?.review as Array<Review>
    )
  }

  return bootcampBookmarks
}
