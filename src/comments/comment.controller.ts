import express, { NextFunction, Request, Response } from 'express'
import Controller from '../interfaces/controller.interface'
import commentRead from './features/comment.read'
import commentCreate from './features/comment.create'
import commentUpdate from './features/comment.update'
import commentDelete from './features/comment.delete'
import CommentValidationException from '../exceptions/CommentValidation.Exception'
import PromiseRejectionException from '../exceptions/PromiseRejection.Exception'
import createCommentValidator from '../validators/createComment.validator'
import validationMiddleware from '../middlewares/validation.middleware'
import CommentDeletionException from '../exceptions/CommentDeletion.exception'
import CommentUpdateException from '../exceptions/CommentUpdate.exception'

export default class CommentsController implements Controller {
  public readonly getPath = '/posts/:postId'
  public readonly postPath = '/posts'
  public readonly path = '/posts/:postId/comments/commentId'
  public readonly router = express.Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .route(this.path)
      .patch(this.updateComment)
      .delete(this.deleteComment)
    this.router.route(this.getPath).get(this.readComment)
    this.router
      .route(this.postPath)
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
      next(new CommentValidationException())
    }

    const commentDTO = req.body
    const newComment = await commentCreate(commentDTO).catch(() =>
      next(new PromiseRejectionException())
    )

    return res.status(201).json(newComment)
  }

  private async updateComment(req: Request, res: Response, next: NextFunction) {
    const { commentId, title, content } = req.body

    if (!commentId || !title || !content) {
      next(new CommentUpdateException())
    } else if (!title || !content) {
      next(new CommentValidationException())
    }

    const commentDTO = req.body
    const modifiedComment = await commentUpdate(commentDTO).catch(() =>
      next(new PromiseRejectionException())
    )

    return res.status(200).json(modifiedComment)
  }

  private async deleteComment(req: Request, res: Response, next: NextFunction) {
    const { commentId } = req.body

    if (!commentId) {
      next(new CommentDeletionException())
    }

    const commentDTO = req.body
    const deletedComment = await commentDelete(commentDTO).catch(() =>
      next(new PromiseRejectionException())
    )

    return res.status(200).json(deletedComment)
  }
}
