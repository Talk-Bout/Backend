import Controller from '../../Infrastructures/interfaces/controller.interface'
import { Router, Request, Response, NextFunction } from 'express'
import PromiseRejectionException from '../../Infrastructures/exceptions/PromiseRejection.exception'
import readBootcamp from '../services/bootcamp.read'
import readReview from '../services/review.read'
import createReview from '../services/review.create'
import createReviewValidator from '../validators/createReview.validator'
import readReviewValidator from '../validators/readReview.validator'
// import readCommunityDetailValidator from '../validators/readCommunityDetail.validator'
// import readCommunity from '../services/community.read'
// import readCommunityDetail from '../services/communityDetail.read'

export default class BootcampController implements Controller {
  public readonly path = '/bootcamp'
  public readonly reviewPath = '/bootcamp/:bootcampName/review'
  public readonly router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route(this.path).get(this.getBootcamp)
    this.router.route(this.reviewPath).get(this.getReview)
    this.router.route(this.reviewPath).post(this.postReview)
  }

  private getBootcamp(req: Request, res: Response, next: NextFunction) {
    return readBootcamp()
      .then((bootcampList) => res.status(200).json(bootcampList))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private getReview(req: Request, res: Response, next: NextFunction) {
    const readReviewDTO: readReviewValidator = {
      bootcampName: req.body.bootcampName
    }

    return readReview(readReviewDTO)
      .then((reviews) => res.status(200).json(reviews))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private postReview(req: Request, res: Response, next: NextFunction) {
    const createReviewDTO: createReviewValidator = {
      nickname: req.body.nickname,
      bootcampName: req.body.bootcampName,
      season: req.body.season,
      pros: req.body.pros,
      cons: req.body.cons,
      stars: req.body.stars
    }

    return createReview(createReviewDTO)
      .then(() => res.status(201).json({ isCreated: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  // private getCommunity(req: Request, res: Response, next: NextFunction) {
  //   return readCommunity()
  //     .then((communities) => res.status(200).json(communities))
  //     .catch((err) => {
  //       console.error(err)
  //       next(new PromiseRejectionException())
  //     })
  // }

  // private getCommunityDetail(req: Request, res: Response, next: NextFunction) {
  //   const readDetailDTO: readCommunityDetailValidator = {
  //     communityId: Number(req.body.communityId)
  //   }

  //   return readCommunityDetail(readDetailDTO)
  //     .then((community) => res.status(200).json(community))
  //     .catch((err) => {
  //       console.error(err)
  //       next(new PromiseRejectionException())
  //     })
  // }
}
