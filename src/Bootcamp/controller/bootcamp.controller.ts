import { Controller } from '../../Infrastructures/interfaces'
import { Router, Request, Response, NextFunction } from 'express'
import { PromiseRejectionException } from '../../Infrastructures/exceptions'
import { validate } from '../../Infrastructures/middlewares'
import { CreateBootcampJunctionValidator } from '../validators'
import { createBootcampBookmark, deleteBootcampBookmark, readBootcamp } from '../services'

export default class BootcampController implements Controller {
  public readonly router = Router({ mergeParams: true })
  public readonly path = '/bootcamp'
  public readonly bootcampBookmarkPath = '/bootcamp/:bootcampName/bootcampBookmarks'

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route(this.path)
      .get(this.getBootcamp)

    this.router.route(this.bootcampBookmarkPath)
      .post(validate(CreateBootcampJunctionValidator), this.postBootcampBookmark)

    this.router.route(this.bootcampBookmarkPath + '/:bootcampBookmarkId')
      .delete(this.deleteBootcampBookmark)
  }

  private getBootcamp(req: Request, res: Response, next: NextFunction) {
    const page: number = Number(req.query.page)

    return readBootcamp(page)
      .then((bootcamps) => res.status(200).json(bootcamps))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private postBootcampBookmark(req: Request, res: Response, next: NextFunction) {
    const createDTO: CreateBootcampJunctionValidator = {
      nickname: req.body.nickname,
      bootcampName: req.body.bootcampName
    }

    return createBootcampBookmark(createDTO)
      .then((bookmark) => res.status(201).json(bookmark))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private deleteBootcampBookmark(req: Request, res: Response, next: NextFunction) {
    const bootcampBookmarkId: number = Number(req.params.bootcampBookmarkId)

    return deleteBootcampBookmark(bootcampBookmarkId)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }
}
