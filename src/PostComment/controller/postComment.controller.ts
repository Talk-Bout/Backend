import { NextFunction, Request, Response, Router } from 'express'
import { Controller } from '../../Infrastructures/interfaces'
import { validate } from '../../Infrastructures/middlewares'
import { PromiseRejectionException } from '../../Infrastructures/exceptions'
import { CreatePostCommentValidator, UpdatePostCommentValidator } from '../validators'
import { createPostComment, readPostComment, updatePostComment, deletePostComment } from '../services'

export default class PostCommentController implements Controller {
    public readonly router = Router()
    public readonly path = '/posts/:postId/postComments'

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.route(this.path)
            .get(this.getPostComment)
            .post(validate(CreatePostCommentValidator), this.postPostComment)

        this.router.route(this.path + '/:postCommentId')
            .patch(validate(UpdatePostCommentValidator), this.patchPostComment)
            .delete(this.deletePostComment)
    }
    
    private async getPostComment(req: Request, res: Response, next: NextFunction) {
        const page: number = Number(req.query.page)
        const postId: number = Number(req.params.postId)
    
        return readPostComment(postId, page)
          .then((comments) => res.status(200).json(comments))
          .catch((err) => {
            console.error(err)
            next(new PromiseRejectionException())
          })
      }
    
      private async postPostComment(req: Request, res: Response, next: NextFunction) {
        const createDTO: CreatePostCommentValidator = {
          postId: req.body.postId,
          nickname: req.body.nickname,
          content: req.body.content
        }
    
        return createPostComment(createDTO)
          .then((comment) => res.status(201).json(comment))
          .catch((err) => {
            console.error(err)
            next(new PromiseRejectionException())
          })
      }
    
      private async patchPostComment(req: Request, res: Response, next: NextFunction) {
        const postCommentId: number = Number(req.params.postCommentId)
        const updateDTO: UpdatePostCommentValidator = {
          content: req.body.content
        }
    
        return updatePostComment(postCommentId, updateDTO)
          .then((modifiedComment) => res.status(200).json(modifiedComment))
          .catch((err) => {
            console.error(err)
            next(new PromiseRejectionException())
          })
      }
    
      private async deletePostComment(req: Request, res: Response, next: NextFunction) {
        const postCommentId: number = Number(req.params.postCommentId)
    
        return deletePostComment(postCommentId)
          .then(() => res.status(200).json({ isDeleted: true }))
          .catch((err) => {
            console.error(err)
            next(new PromiseRejectionException())
          })
      }

}