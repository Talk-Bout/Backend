import { Post, Question, Answer, Review } from '@prisma/client'
import moment from '../../Infrastructures/utils/moment'
import { prisma } from '../../Infrastructures/utils/prisma'

export default async (nickname: object) => {
  const Post = prisma.post
  const Question = prisma.question
  const Answer = prisma.answer
  const Review = prisma.review

  type PostType = Omit<Post, 'createdAt'> & {
    createdAt: string | Date
  }

  type QuestionType = Omit<Question, 'createdAt'> & {
    createdAt: string | Date
  }

  type AnswerType = Omit<Answer, 'createdAt'> & {
    createdAt: string | Date
  }

  type ReviewType = Omit<Review, 'createdAt'> & {
    createdAt: string | Date
  }

  const posts: Array<PostType> = await Post.findMany({
    where: nickname,
    orderBy: [{ createdAt: 'desc' }]
  })

  const questions: Array<QuestionType> = await Question.findMany({
    where: nickname,
    orderBy: [{ createdAt: 'desc' }]
  })

  const answers: Array<AnswerType> = await Answer.findMany({
    where: nickname,
    orderBy: [{ createdAt: 'desc' }]
  })

  const reviews: Array<ReviewType> = await Review.findMany({
    where: nickname,
    orderBy: [{ createdAt: 'desc' }]
  })

  for (const post of posts) {
    post.createdAt = moment(post.createdAt as Date)
  }

  for (const question of questions) {
    question.createdAt = moment(question.createdAt as Date)
  }

  for (const answer of answers) {
    answer.createdAt = moment(answer.createdAt as Date)
  }

  for (const review of reviews) {
    review.createdAt = moment(review.createdAt as Date)
  }

  return {
    posts: posts,
    questions: questions,
    answers: answers,
    reviews: reviews
  }
}
