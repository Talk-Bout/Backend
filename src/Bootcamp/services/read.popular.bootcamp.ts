import { prisma } from '../../Infrastructures/utils/prisma'
export default async () => {
 
  const Bootcamp = prisma.bootcamp
  let bootcamps = await Bootcamp.findMany({ include: { review: true}})

  for (let bootcamp of bootcamps){
    let totalReviewNumber = bootcamp?.review.length
    let stars = 0
    let reviews = bootcamp.review

    if(reviews.length !== 0) {

      for(let i =0; i < reviews.length; i++)
      (stars += reviews[i].stars)
      let avgStar = stars/totalReviewNumber
      bootcamp.avgStar = avgStar
    }else{
      bootcamp.avgStar = 0
    }
  }
  let result: any = bootcamps
  result.sort(function (a,b ){
      return Number(b.avgStar) - Number(a.avgStar) 
    })
  return result
}

