import { Review } from '@prisma/client'

export default (reviews: Array<Review>) => {
  let starsTotal
  if (!reviews || reviews.length == 1) {
    return 0
  }
  if (reviews.length > 0) {
    starsTotal = reviews.map((review) => review.stars).reduce((acc, curr) => acc + curr)
  } else {
    starsTotal = 0
  }

  if (reviews.length > 1) {
    return starsTotal / (reviews.length - 1)
  }
}
