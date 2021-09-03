import { Request, Response, NextFunction, Router } from 'express'
import Controller from '../../Infrastructures/interfaces/controller.interface'
import validate from '../../Infrastructures/middlewares/validation.middleware'
import prismaException from '../../Infrastructures/utils/prismaException'
import isProper from '../../Infrastructures/utils/isProper'
import {
  CreateQuestionValidator,
  UpdateQuestionValidator,
  QuestionJunctionValidator
} from '../validators'
import {
  createQuestion,
  readQuestion,
  updateQuestion,
  deleteQuestion,
  detailQuestion,
  popularQuestion,
  createQuestionLike,
  deleteQuestionLike,
  createQuestionBookmark,
  deleteQuestionBookmark
} from '../services'
import authenticate from '../../Infrastructures/middlewares/authentication.middleware'

export default class QuestionsController implements Controller {
  public readonly router = Router()
  public readonly path = '/api/questions'
  public readonly bookmarkPath = '/api/questions/:questionId/questionBookmarks'
  public readonly likePath = '/api/questions/:questionId/questionLikes'
  public readonly popularPath = '/api/popular/questions'

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .route(this.path)
      .get(this.getQuestion)
      .post(
        authenticate(),
        validate(CreateQuestionValidator),
        isProper(),
        this.postQuestion
      )

    this.router
      .route(this.path + '/:questionId')
      .get(this.detailQuestion)
      .patch(
        authenticate(),
        validate(UpdateQuestionValidator),
        isProper(),
        this.patchQuestion
      )
      .delete(authenticate(), validate(QuestionJunctionValidator), this.deleteQuestion)

    this.router
      .route(this.bookmarkPath)
      .post(
        authenticate(),
        validate(QuestionJunctionValidator),
        this.postQuestionBookmark
      )
      .delete(
        authenticate(),
        validate(QuestionJunctionValidator),
        this.deleteQuestionBookmark
      )

    this.router
      .route(this.likePath)
      .post(authenticate(), validate(QuestionJunctionValidator), this.postQuestionLike)
      .delete(
        authenticate(),
        validate(QuestionJunctionValidator),
        this.deleteQuestionLike
      )

    this.router.route(this.popularPath).get(this.popularQuestion)
  }

  private getQuestion(req: Request, res: Response, next: NextFunction) {
    const page: number = Number(req.query.page)

    return readQuestion(page)
      .then((questions) => res.status(200).json(questions))
      .catch((err) => prismaException(err, next))
  }

  private postQuestion(req: Request, res: Response, next: NextFunction) {
    const requestObject: CreateQuestionValidator = {
      title: req.body.title,
      content: req.body.content,
      nickname: String(req.user),
      image: req.body.image || null
    }

    return createQuestion(requestObject)
      .then((question) => res.status(201).json(question))
      .catch((err) => prismaException(err, next))
  }

  private detailQuestion(req: Request, res: Response, next: NextFunction) {
    const questionId: number = Number(req.params.questionId)

    return detailQuestion(questionId)
      .then((question) => res.status(200).json(question))
      .catch((err) => prismaException(err, next))
  }

  private patchQuestion(req: Request, res: Response, next: NextFunction) {
    const questionId: number = Number(req.params.questionId)
    const user = String(req.user)
    const requestObject: UpdateQuestionValidator = {
      title: req.body.title,
      content: req.body.content,
      image: req.body.image || null
    }

    return updateQuestion(questionId, user, requestObject)
      .then((question) => res.status(200).json(question))
      .catch((err) => prismaException(err, next))
  }

  private deleteQuestion(req: Request, res: Response, next: NextFunction) {
    const questionId: number = Number(req.params.questionId)
    const user = String(req.user)

    return deleteQuestion(questionId, user)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => prismaException(err, next))
  }

  private popularQuestion(req: Request, res: Response, next: NextFunction) {
    const page: number = Number(req.query.page)

    return popularQuestion(page)
      .then((questions) => res.status(200).json(questions))
      .catch((err) => prismaException(err, next))
  }

  private postQuestionBookmark(req: Request, res: Response, next: NextFunction) {
    const requestObject: QuestionJunctionValidator = {
      nickname: String(req.user),
      questionId: req.body.questionId
    }

    return createQuestionBookmark(requestObject)
      .then((bookmark) => res.status(201).json(bookmark))
      .catch((err) => prismaException(err, next))
  }

  private deleteQuestionBookmark(req: Request, res: Response, next: NextFunction) {
    const requestObject: QuestionJunctionValidator = {
      nickname: String(req.user),
      questionId: Number(req.params.questionId) // what happens if Id has a string value
    }

    return deleteQuestionBookmark(requestObject)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => prismaException(err, next))
  }

  private postQuestionLike(req: Request, res: Response, next: NextFunction) {
    const requestObject: QuestionJunctionValidator = {
      nickname: String(req.user),
      questionId: req.body.questionId
    }

    return createQuestionLike(requestObject)
      .then((like) => res.status(201).json(like))
      .catch((err) => prismaException(err, next))
  }

  private deleteQuestionLike(req: Request, res: Response, next: NextFunction) {
    const requestObject: QuestionJunctionValidator = {
      nickname: String(req.user),
      questionId: Number(req.params.questionId)
    }

    return deleteQuestionLike(requestObject)
      .then(() => res.status(201).json({ isDeleted: true }))
      .catch((err) => prismaException(err, next))
  }
}
