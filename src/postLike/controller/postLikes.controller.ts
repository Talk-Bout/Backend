import Controller from '../../Infrastructures/interfaces/controller.interface'
import { Router, Request, Response, NextFunction } from 'express'
import authenticate from '../../Infrastructures/middlewares/authentication.middleware'
import validate from '../../Infrastructures/middlewares/validation.middleware'
import createValidator from '../validators/createPostLike.validator'
import deleteValidator from '../validators/deletePostLike.validator'
import PromiseRejectionException from '../../Infrastructures/exceptions/PromiseRejection.exception'
import Create from '../services/postLike.create'
import Delete from '../services/postLike.delete'

export default class BookmarksController implements Controller {
  public readonly path = '/posts/:postId/postLike'
  public readonly router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .route(this.path)
      .post(validate(createValidator), this.createPostLike)

    this.router.route(this.path + '/:postLikeId').delete(this.deletePostLike)
  }

  private createPostLike(req: Request, res: Response, next: NextFunction) {
    const createDTO: createValidator = {
      nickname: req.body.nickname,
      postId: req.body.postId
    }

    return Create(createDTO)
      .then(() => res.status(201).json({ isCreated: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private deletePostLike(req: Request, res: Response, next: NextFunction) {
    const deleteDTO: deleteValidator = {
      postLikeId: Number(req.params.postLikeId)
    }

    return Delete(deleteDTO)
      .then(() => res.status(201).json({ isDeleted: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }
}
