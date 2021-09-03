import { NextFunction, Request, Response, Router } from 'express'
import { Controller } from '../../Infrastructures/interfaces'
import { validate } from '../../Infrastructures/middlewares'
import prismaException from '../../Infrastructures/utils/prismaException'
import { CreateReviewValidator } from '../validators'
import { readReview, createReview } from '../services'
import isProper from '../../Infrastructures/utils/isProper'
import authenticate from '../../Infrastructures/middlewares/authentication.middleware'

export default class ReviewController implements Controller {
  public readonly router = Router()
  public readonly path = '/api/bootcamp/:bootcampName/review'

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .route(this.path)
      .post(authenticate(), validate(CreateReviewValidator), this.postReview)
      .get(this.getReview)
  }

  private getReview(req: Request, res: Response, next: NextFunction) {
    const bootcampName: string = req.params.bootcampName
    const page: number = Number(req.query.page)

    return readReview(bootcampName, page)
      .then((reviews) => res.status(200).json(reviews))
      .catch((err) => prismaException(err, next))
  }

  private postReview(req: Request, res: Response, next: NextFunction) {
    const requestObject: CreateReviewValidator = {
      nickname: String(req.user),
      bootcampName: req.body.bootcampName,
      status: req.body.status,
      pros: req.body.pros,
      cons: req.body.cons,
      stars: req.body.stars,
      title: req.body.title
    }

    return createReview(requestObject)
      .then((review) => res.status(201).json(review))
      .catch((err) => prismaException(err, next))
  }
}
