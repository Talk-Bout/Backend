import { Router, Request, Response, NextFunction } from 'express'
import Controller from '../../Infrastructures/interfaces/controller.interface'
import authenticate from '../../Infrastructures/middlewares/authentication.middleware'
import validate from '../../Infrastructures/middlewares/validation.middleware'
import createValidator from '../validators/createBookmark.validator'
import deleteValidator from '../validators/deleteBookmark.validator'
import readValidator from '../validators/readBookmark.validator'
import Create from '../services/bookmark.create'
import Delete from '../services/bookmark.delete'
import Read from '../services/bookmark.read'
import PromiseRejectionException from '../../Infrastructures/exceptions/PromiseRejection.exception'

export default class BookmarksController implements Controller {
  public readonly path = '/users/:nickname/bookmark'
  public readonly router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .route(this.path)
      .get(validate(readValidator), this.readBookmark)
      .post(validate(createValidator), this.createBookmark)

    this.router.route(this.path + '/:bookmarkId').delete(this.deleteBookmark)
  }

  private readBookmark(req: Request, res: Response, next: NextFunction) {
    const readDTO: readValidator = {
      nickname: req.body.nickname
    }

    return Read(readDTO)
      .then((bookmarks) => res.status(200).json(bookmarks))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private createBookmark(req: Request, res: Response, next: NextFunction) {
    const createDTO: createValidator = {
      nickname: req.body.nickname,
      postId: req.body.postId
    }

    return Create(createDTO)
      .then((newBookmark) => res.status(201).json(newBookmark))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private deleteBookmark(req: Request, res: Response, next: NextFunction) {
    const deleteDTO: deleteValidator = {
      bookmarkId: Number(req.params.bookmarkId)
    }

    return Delete(deleteDTO)
      .then(() => res.status(200).json({ deleted: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }
}
