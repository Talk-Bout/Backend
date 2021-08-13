import { prisma } from '../../Infrastructures/utils/prisma'
import getAnswerValidator from '../validators/getAnswer.validator'

export default async(DTO: getAnswerValidator) => {
  console.log(Number(DTO.page) , Number(DTO.questionId))
  const Answer = prisma.answer
  const ITEMS_PER_PAGE = 5

  const answers = await Answer.findMany({
    where:{ questionId : DTO.questionId},
    skip: (DTO.page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
    include: { answerLike: true },
  
  })


  for (let answer of answers ){
    if(answer.answerLike.length !== 0){
      //console.log(`${answer.answerId}, has ${answer.answerLike.length}`)
      answer["likeNumber"]=answer.answerLike?.length
    }else{
      answer["likeNumber"]= 0
    }
  }


//: Array<answerWithLikeCnt>
  let result= answers
  result.sort(function (a,b ){
      
      return Number(b.likeNumber) - Number(a.likeNumber) 
    })
  console.log(result)
  return(result)

}
