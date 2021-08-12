import { prisma } from '../../Infrastructures/utils/prisma'
import questionWithLikeCnt from '../../Infrastructures/interfaces/questionWithLikeCnt'

export default async () => {
  const Questions = await prisma.question
  let postWithLike = {}
  const questions = await Questions.findMany({
    include: {
      questionLike: true,
      user:true      
    }
    
  }) as Array<questionWithLikeCnt>

  for (const question of questions ){
    question["likeNumber"] = question.questionLike?.length 
  
  }

  let result: Array<questionWithLikeCnt> = questions
  result.sort(function (a,b ){
      return Number(b.likeNumber) - Number(a.likeNumber) 
    })
  return(result)
}
