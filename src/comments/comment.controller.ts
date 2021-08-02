import express, { NextFunction, Request, Response } from 'express'
import Controller from '../interfaces/controller.interface'
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
    public readonly path = '/posts/:postId/comments'
    public readonly router = express.Router()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(this.path, validationMiddleware(createCommentValidator), this.createComment)
        this.router.patch(this.path + '/commentId', this.updateComment)
        this.router.delete(this.path + '/commentId', this.deleteComment)
    }

    private async createComment(req: Request, res: Response, next: NextFunction) {
        const { postId, nickname, content } = req.body

        if (!nickname || !content || !postId) {
            next(new CommentValidationException())
        }

        const commentDTO = req.body
        const newComment = await commentCreate(commentDTO).catch(() => next(new PromiseRejectionException()))

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
        const modifiedComment = await commentUpdate(commentDTO).catch(() => next(new PromiseRejectionException()))

        return res.status(200).json(modifiedComment)
    }

    private async deleteComment(req: Request, res: Response, next: NextFunction) {
        const { commentId } = req.body

        if (!commentId) {
            next(new CommentDeletionException())
        }

        const commentDTO = req.body
        const deleteComment = await commentDelete(commentDTO).catch(() => next(new PromiseRejectionException()))

        return res.status(200).json(deleteComment)
    }
}
