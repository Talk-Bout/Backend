import { Request, Response, NextFunction, Router } from 'express'
import { Controller } from '../../Infrastructures/interfaces'
import { PromiseRejectionException } from '../../Infrastructures/exceptions'
import { validate } from '../../Infrastructures/middlewares'
import { CreateAnswerValidator, CreateAnswerJunctionValidator } from '../validators'
import { createAnswer, readAnswer, createAnswerLike, deleteAnswerLike, readPopularAnswer } from '../services'

export default class AnswersController implements Controller {
    public readonly path = '/questions/:questionId/answers'
    public readonly likePath = '/answers/:answerId/answerLike'
    public readonly router = Router()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.route(this.path)
            .get(this.getAnswer)
            .post(validate(CreateAnswerValidator), this.postAnswer)

        this.router.route(this.likePath)
            .post(validate(CreateAnswerJunctionValidator), this.postAnswerLike)

        this.router.route(this.likePath + '/:answerLikeId')
            .delete(this.deleteAnswerLike)
    }

    private getAnswer(req: Request, res: Response, next: NextFunction) {
        const getAnswerDTO = {
            questionId : Number(req.params.questionId),
            page :Number(req.query.page)
        }
        
        console.log(getAnswerDTO)

        return readPopularAnswer(getAnswerDTO)
            .then((answers) => res.status(200).json(answers))
            .catch((err) => {
              console.error(err)
              next(new PromiseRejectionException())
            })
    }

    private postAnswer(req: Request, res: Response, next: NextFunction) {
        const createAnswerDTO: CreateAnswerValidator = {
            questionId: req.body.questionId,
            nickname: req.body.nickname,
            content: req.body.content,
            image: req.body.image
        }

        return createAnswer(createAnswerDTO)
            .then((answer) => res.status(200).json(answer))
            .catch((err) => {
              console.error(err)
              next(new PromiseRejectionException())
            })
    }

    private postAnswerLike(req: Request, res: Response, next: NextFunction) {
        const createAnswerLikeDTO: CreateAnswerJunctionValidator = {
            nickname: req.body.nickname,
            answerId: req.body.answerId
        }

        return createAnswerLike(createAnswerLikeDTO)
            .then((like) => res.status(200).json(like))
            .catch((err) => {
              console.error(err)
              next(new PromiseRejectionException())
            })
    }

    private deleteAnswerLike(req: Request, res: Response, next: NextFunction) {
        const answerLikeId: number = Number(req.params.answerLikeId)

        return deleteAnswerLike(answerLikeId)
            .then(() => res.status(200).json({ isDeleted: true }))
            .catch((err) => {
              console.error(err)
              next(new PromiseRejectionException())
            })
    }
}