import express, { NextFunction, Request, Response } from 'express'
import Controller from '../interfaces/controller.interface'
import commentCreate from './features/comment.create'
import commentUpdate from './features/comment.update'
import commentDelete from './features/comment.delete'

export default class CommentsController implements Controller {
    public readonly path = '/posts/:postId/comments'
    public readonly router = express.Router()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(this.path, this.createComment)
        this.router.patch(this.path + '/commentId', this.updateComment)
        this.router.delete(this.path + '/commentId', this.deleteComment)
    }

    private createComment(req: Request, res: Response, next: NextFunction) {
        commentCreate(req, res, next)
    }
    private updateComment(req: Request, res: Response, next: NextFunction) {
        commentUpdate(req, res, next)
    }
    private deleteComment(req: Request, res: Response, next: NextFunction) {
        commentDelete(req, res, next)
    }
}
