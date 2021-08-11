import { Request, Response, NextFunction, Router } from 'express'
import Controller from '../../Infrastructures/interfaces/controller.interface'
import PromiseRejectionException from '../../Infrastructures/exceptions/PromiseRejection.exception'
import validate from '../../Infrastructures/middlewares/validation.middleware'
import { CreateQuestionValidator, UpdateQuestionValidator, CreateQuestionJunctionValidator } from '../validators'
import { createQuestion, readQuestion, updateQuestion, deleteQuestion, detailQuestion, 
  createQuestionLike, deleteQuestionLike, createQuestionBookmark, deleteQuestionBookmark} from '../services'

export default class QuestionsController implements Controller {
  public readonly router = Router()
  public readonly path = '/questions'
  public readonly bookmarkPath = '/questions/:questionId/questionBookmarks'
  public readonly likePath = '/questions/:questionId/questionLikes'

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route(this.path)
      .get(this.getQuestions)
      .post(validate(CreateQuestionValidator), this.postQuestion)

    this.router.route(this.path + '/:questionId')
      .get(this.detailQuestion)
      .patch(validate(UpdateQuestionValidator), this.patchQuestion)
      .delete(this.deleteQuestion)

    this.router.route(this.bookmarkPath)
      .post(validate(CreateQuestionJunctionValidator), this.postQuestionBookmark)

    this.router.route(this.bookmarkPath + '/:questionBookmarkId')
      .delete(this.deleteQuestionBookmark)

    this.router.route(this.likePath)
      .post(validate(CreateQuestionJunctionValidator), this.postQuestionLike)

    this.router.route(this.likePath + '/:questionLikeId')
      .delete(this.deleteQuestionLike)
  }

  private getQuestions(req: Request, res: Response, next: NextFunction) {
    const page: number = Number(req.query.page)

    return readQuestion(page)
      .then((questions) => res.status(200).json(questions))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private postQuestion(req: Request, res: Response, next: NextFunction) {
    const createQuestionDTO: CreateQuestionValidator = {
      title: req.body.title,
      content: req.body.content,
      nickname: req.body.nickname,
      image: req.body.image || null
    }

    return createQuestion(createQuestionDTO)
      .then((question) => res.status(201).json(question))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private detailQuestion(req: Request, res: Response, next: NextFunction) {
    const questionId: number = Number(req.params.questionId)

    return detailQuestion(questionId)
      .then((question) => res.status(200).json(question))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private patchQuestion(req: Request, res: Response, next: NextFunction) {
    const questionId: number = Number(req.params.questionId)
    const updateQuestionDTO: UpdateQuestionValidator = {
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      nickname: req.body.nickname
    }

    return updateQuestion(questionId, updateQuestionDTO)
      .then((question) => res.status(200).json(question))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private deleteQuestion(req: Request, res: Response, next: NextFunction) {
    const questionId: number = Number(req.params.questionId)

    return deleteQuestion(questionId)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private postQuestionBookmark(req: Request, res: Response, next: NextFunction) {
    const createDTO: CreateQuestionJunctionValidator = {
      nickname: req.body.nickname,
      questionId: req.body.questionId
    }

    return createQuestionBookmark(createDTO)
      .then((bookmark) => res.status(201).json(bookmark))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private deleteQuestionBookmark(req: Request, res: Response, next: NextFunction) {
    const questionBookmarkId: number = Number(req.params.questionBookmarkId)

    return deleteQuestionBookmark(questionBookmarkId)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private postQuestionLike(req: Request, res: Response, next: NextFunction) {
    const createDTO: CreateQuestionJunctionValidator = {
      nickname: req.body.nickname,
      questionId: req.body.questionId
    }

    return createQuestionLike(createDTO)
      .then((like) => res.status(201).json(like))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private deleteQuestionLike(req: Request, res: Response, next: NextFunction) {
    const questionLikeId: number = Number(req.params.questionLikeId)

    return deleteQuestionLike(questionLikeId)
      .then(() => res.status(201).json({ isDeletted: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }
}
