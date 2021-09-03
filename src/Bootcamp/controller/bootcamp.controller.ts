import { Controller } from '../../Infrastructures/interfaces'
import { Router, Request, Response, NextFunction, request } from 'express'
import prismaException from '../../Infrastructures/utils/prismaException'
import { validate } from '../../Infrastructures/middlewares'
import { BootcampJunctionValidator } from '../validators'
import {
  createBootcampBookmark,
  deleteBootcampBookmark,
  readBootcamp,
  popularBootcamp
} from '../services'
import authenticate from '../../Infrastructures/middlewares/authentication.middleware'
import detailBootcamp from '../services/detail.bootcamp'
import notmeBootcamp from '../services/notme.bootcamp'
import { prisma } from '../../Infrastructures/utils/prisma'

export default class BootcampController implements Controller {
  public readonly router = Router({ mergeParams: true })
  public readonly path = '/api/bootcamp'
  public readonly bootcampBookmarkPath = '/api/bootcamp/:bootcampName/bootcampBookmarks'
  public readonly popularPath = '/api/popular/bootcamps'

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route(this.path).get(this.getBootcamp)

    this.router
      .route(this.bootcampBookmarkPath)
      .post(
        authenticate(),
        validate(BootcampJunctionValidator),
        this.postBootcampBookmark
      )
      .delete(authenticate(), this.deleteBootcampBookmark)

    this.router
      .route(this.path + '/:bootcampName')
      .get(this.detailBootcamp)
      .patch(async (req, res, next) => {
        const requestBody = req.body
        const Bootcamp = prisma.bootcamp
        const result = await Bootcamp.update({
          where: { bootcampName: req.params.bootcampName },
          data: requestBody
        })
        res.json(result)
      })
    this.router.route(this.popularPath).get(this.popularBootcamp)
    this.router.route(this.path + '/:bootcampName/notme').get(this.notmeBootcamp)
  }

  private getBootcamp(req: Request, res: Response, next: NextFunction) {
    const page: number = Number(req.query.page)

    return readBootcamp(page)
      .then((bootcamps) => res.status(200).json(bootcamps))
      .catch((err) => prismaException(err, next))
  }

  private popularBootcamp(req: Request, res: Response, next: NextFunction) {
    // const page: number = Number(req.query.page)

    return popularBootcamp()
      .then((bootcamps) => res.status(200).json(bootcamps))
      .catch((err) => prismaException(err, next))
  }

  private detailBootcamp(req: Request, res: Response, next: NextFunction) {
    const bootcampName = req.params.bootcampName

    return detailBootcamp(bootcampName)
      .then((bootcamps) => res.status(200).json(bootcamps))
      .catch((err) => prismaException(err, next))
  }

  private notmeBootcamp(req: Request, res: Response, next: NextFunction) {
    const bootcampName = req.params.bootcampName

    return notmeBootcamp(bootcampName)
      .then((bootcamps) => res.status(200).json(bootcamps))
      .catch((err) => prismaException(err, next))
  }

  private postBootcampBookmark(req: Request, res: Response, next: NextFunction) {
    const requestObject: BootcampJunctionValidator = {
      nickname: String(req.user),
      bootcampName: req.body.bootcampName
    }

    return createBootcampBookmark(requestObject)
      .then((bookmark) => res.status(201).json(bookmark))
      .catch((err) => prismaException(err, next))
  }

  private deleteBootcampBookmark(req: Request, res: Response, next: NextFunction) {
    const requestObject: BootcampJunctionValidator = {
      nickname: String(req.user),
      bootcampName: req.params.bootcampName
    }

    return deleteBootcampBookmark(requestObject)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => prismaException(err, next))
  }
}
