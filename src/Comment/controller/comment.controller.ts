import express, { NextFunction, Request, Response } from 'express'
import Controller from '../../Infrastructures/interfaces/controller.interface'
import commentRead from '../services/comment.read'
import commentCreate from '../services/comment.create'
import commentUpdate from '../services/comment.update'
import commentDelete from '../services/comment.delete'
import PromiseRejectionException from '../../Infrastructures/exceptions/PromiseRejection.exception'
import ValidationFailureException from '../../Infrastructures/exceptions/ValidationFailure.exception'
import validationMiddleware from '../../Infrastructures/middlewares/validation.middleware'
import createCommentValidator from '../validators/createComment.validator'

export default class CommentsController implements Controller {
  public readonly path = '/posts/:postId/comments'
  public readonly idPath = '/posts/:postId/comments/:commentId'
  public readonly router = express.Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .route(this.idPath)
      .patch(this.updateComment)
      .delete(this.deleteComment)
    this.router.route(this.path).get(this.readComment)
    this.router
      .route(this.path)
      .post(validationMiddleware(createCommentValidator), this.createComment)
  }

  private async readComment(req: Request, res: Response, next: NextFunction) {
    const DTO = req.body.postId
    const postList = await commentRead(DTO).catch(() =>
      next(new PromiseRejectionException())
    )

    return res.status(200).json(postList)
  }

  private async createComment(req: Request, res: Response, next: NextFunction) {
    const { postId, nickname, content } = req.body

    if (!nickname || !content || !postId) {
      next(new ValidationFailureException())
    }

    const commentDTO = req.body
    const newComment = await commentCreate(commentDTO).catch(() =>
      next(new PromiseRejectionException())
    )

    return res.status(201).json(newComment)
  }

  private async updateComment(req: Request, res: Response, next: NextFunction) {
    const { commentId, nickname, content } = req.body

    if (!commentId || !nickname || !content) {
      next(new ValidationFailureException())
    }

    const commentDTO = {
      commentId: req.body.commentId,
      content: req.body.content
    }
    const modifiedComment = await commentUpdate(commentDTO).catch((err) => {
      console.error(err)
      next(new PromiseRejectionException())
    })

    return res.status(200).json(modifiedComment)
  }

  private async deleteComment(req: Request, res: Response, next: NextFunction) {
    const { commentId } = req.body

    if (!commentId) {
      next(new ValidationFailureException())
    }

    const commentDTO = commentId
    const deletedComment = await commentDelete(commentDTO).catch((err) => {
      console.error(err)
      next(new PromiseRejectionException())
    })

    return res.status(200).json({ deleted: true })
  }
}
