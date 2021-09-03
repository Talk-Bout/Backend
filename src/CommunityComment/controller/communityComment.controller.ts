import { Controller } from '../../Infrastructures/interfaces'
import { Router, Request, Response, NextFunction } from 'express'
import prismaException from '../../Infrastructures/utils/prismaException'
import { validate } from '../../Infrastructures/middlewares'
import { CreateCommunityCommentValidator } from '../validators'
import {
  createCommunityComment,
  readCommunityComment,
  updateCommunityComment,
  deleteCommunityComment
} from '../services'

export default class BootcampController implements Controller {
  public readonly router = Router()
  public readonly path = '/api/community/:communityId/communityComments'

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .route(this.path)
      .get(this.getCommunityComment)
      .post(validate(CreateCommunityCommentValidator), this.postCommunityComment)

    this.router
      .route(this.path + '/:communityCommentId')
      .patch(this.patchCommunityComment)
      .delete(this.deleteCommunityComment)
  }

  private getCommunityComment(req: Request, res: Response, next: NextFunction) {
    const communityId: number = Number(req.params.communityId)
    const page: number = Number(req.query.page)

    return readCommunityComment(communityId, page)
      .then((comments) => res.status(200).json(comments))
      .catch((err) => prismaException(err, next))
  }

  private postCommunityComment(req: Request, res: Response, next: NextFunction) {
    const createCommunityCommentDTO: CreateCommunityCommentValidator = {
      content: req.body.content,
      nickname: req.body.nickname,
      communityId: req.body.communityId
    }

    return createCommunityComment(createCommunityCommentDTO)
      .then((comment) => res.status(200).json(comment))
      .catch((err) => prismaException(err, next))
  }

  private patchCommunityComment(req: Request, res: Response, next: NextFunction) {
    const communityCommentId: number = Number(req.params.communityCommentId)
    const content: string = req.body.content

    return updateCommunityComment(communityCommentId, content)
      .then((comment) => res.status(200).json(comment))
      .catch((err) => prismaException(err, next))
  }

  private deleteCommunityComment(req: Request, res: Response, next: NextFunction) {
    const communityCommentId: number = Number(req.params.communityCommentId)

    return deleteCommunityComment(communityCommentId)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => prismaException(err, next))
  }
}
