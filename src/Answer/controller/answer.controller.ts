import { Request, Response, NextFunction, Router } from 'express'
import { Controller } from '../../Infrastructures/interfaces'
import prismaException from '../../Infrastructures/utils/prismaException'
import { validate } from '../../Infrastructures/middlewares'
import { CreateAnswerValidator, AnswerJunctionValidator } from '../validators'
import authenticate from '../../Infrastructures/middlewares/authentication.middleware'
import { createAnswer, readAnswer, createAnswerLike, deleteAnswerLike } from '../services'
import isProper from '../../Infrastructures/utils/isProper'

export default class AnswersController implements Controller {
  public readonly router = Router()
  public readonly path = '/api/questions/:questionId/answers'
  public readonly likePath = '/api/answers/:answerId/answerLike'

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .route(this.path)
      .get(this.getAnswer)
      .post(authenticate(), validate(CreateAnswerValidator), isProper(), this.postAnswer)

    this.router
      .route(this.likePath)
      .post(authenticate(), validate(AnswerJunctionValidator), this.postAnswerLike)
      .delete(authenticate(), this.deleteAnswerLike)
  }

  private getAnswer(req: Request, res: Response, next: NextFunction) {
    const questionId: number = Number(req.params.questionId)
    const page: number = Number(req.query.page)

    return readAnswer(questionId, page)
      .then((answers) => res.status(200).json(answers))
      .catch((err) => prismaException(err, next))
  }

  private postAnswer(req: Request, res: Response, next: NextFunction) {
    const requestObject: CreateAnswerValidator = {
      questionId: req.body.questionId,
      nickname: req.body.nickname,
      content: req.body.content,
      image: req.body.image || null
    }

    return createAnswer(requestObject)
      .then((answer) => res.status(200).json(answer))
      .catch((err) => prismaException(err, next))
  }

  private postAnswerLike(req: Request, res: Response, next: NextFunction) {
    const requestObject: AnswerJunctionValidator = {
      nickname: String(req.user),
      answerId: req.body.answerId
    }

    return createAnswerLike(requestObject)
      .then((like) => res.status(200).json(like))
      .catch((err) => prismaException(err, next))
  }

  private deleteAnswerLike(req: Request, res: Response, next: NextFunction) {
    const requestObject: AnswerJunctionValidator = {
      nickname: String(req.user),
      answerId: Number(req.params.answerId)
    }

    return deleteAnswerLike(requestObject)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => prismaException(err, next))
  }
}
