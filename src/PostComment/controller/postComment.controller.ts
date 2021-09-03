import { NextFunction, Request, Response, Router } from 'express'
import { Controller } from '../../Infrastructures/interfaces'
import { validate } from '../../Infrastructures/middlewares'
import prismaException from '../../Infrastructures/utils/prismaException'
import authenticate from '../../Infrastructures/middlewares/authentication.middleware'
import { CreatePostCommentValidator, UpdatePostCommentValidator } from '../validators'
import isProper from '../../Infrastructures/utils/isProper'
import {
  createPostComment,
  readPostComment,
  updatePostComment,
  deletePostComment
} from '../services'

export default class PostCommentController implements Controller {
  public readonly router = Router()
  public readonly path = '/api/posts/:postId/postComments'

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .route(this.path)
      .get(this.getPostComment)
      .post(
        authenticate(),
        validate(CreatePostCommentValidator),
        isProper(),
        this.postPostComment
      )

    this.router
      .route(this.path + '/:postCommentId')
      .patch(
        authenticate(),
        validate(UpdatePostCommentValidator),
        isProper(),
        this.patchPostComment
      )
      .delete(authenticate(), this.deletePostComment)
  }

  private async getPostComment(req: Request, res: Response, next: NextFunction) {
    const page: number = Number(req.query.page)
    const postId: number = Number(req.params.postId)

    return readPostComment(postId, page)
      .then((comments) => res.status(200).json(comments))
      .catch((err) => prismaException(err, next))
  }

  private async postPostComment(req: Request, res: Response, next: NextFunction) {
    const requestObject: CreatePostCommentValidator = {
      nickname: String(req.user),
      postId: req.body.postId,
      content: req.body.content
    }

    return createPostComment(requestObject)
      .then((newComment) => res.status(201).json(newComment))
      .catch((err) => prismaException(err, next))
  }

  private async patchPostComment(req: Request, res: Response, next: NextFunction) {
    const postCommentId: number = Number(req.params.postCommentId)
    const user = String(req.user)
    const requestObject: UpdatePostCommentValidator = {
      content: req.body.content
    }

    return updatePostComment(postCommentId, user, requestObject)
      .then((modifiedComment) => res.status(200).json(modifiedComment))
      .catch((err) => prismaException(err, next))
  }

  private async deletePostComment(req: Request, res: Response, next: NextFunction) {
    const postCommentId: number = Number(req.params.postCommentId)
    const user = String(req.user)

    return deletePostComment(postCommentId, user)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => prismaException(err, next))
  }
}
