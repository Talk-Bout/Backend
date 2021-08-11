import { prisma } from '../../Infrastructures/utils/prisma'

export default async () => {
  const Question = prisma.question
  let questionLike = {}

  const questions = await Question.findMany({
    include: { questionLike: true,
               user:true }
  })
  for (const question of questions ){
    question["likeNumber"] = question.questionLike.length
  }
  questions.sort(function(a, b) {
    return b.likeNumber - a.likeNumber;
  });
  console.log(questions);
}




