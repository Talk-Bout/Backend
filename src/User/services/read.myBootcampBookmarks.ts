import { prisma } from '../../Infrastructures/utils/prisma'
import { NicknameValidator } from '../validators'

export default async (nickname: NicknameValidator) => {
  const BootcampBookmark = prisma.bootcampBookmark
  const Bootcamp = prisma.bootcamp

  let result: any = []
  const bookmarks = await BootcampBookmark.findMany({ where: nickname })

  for (let bookmark of bookmarks){
 
    let bootcampName = bookmark.bootcampName
    let bootcamps = await Bootcamp.findFirst({ where: {bootcampName: bootcampName },include: { review: true,}})
   
    
  }

  for (let bootcamp of result){
    let totalReviewNumber = bootcamp?.review.length
    let stars = 0
    let reviews = bootcamp.review

    if(reviews.length !== 0) {
      for(let i =0; i < reviews.length; i++)
      (stars += reviews[i].stars)}

    //console.log(stars)
    let avgStar = stars/totalReviewNumber
    //console.log(avgStar)
 
    if (avgStar){
      bootcamp["avgStar"] = avgStar
    }
  }
 
  return result
}

