import express, { NextFunction, Request, Response } from 'express'
import Controller from '../../Infrastructures/interfaces/controller.interface'
import Read from '../services/comment.read'
import Create from '../services/comment.create'
import Update from '../services/comment.update'
import Delete from '../services/comment.delete'
import PromiseRejectionException from '../../Infrastructures/exceptions/PromiseRejection.exception'
import validate from '../../Infrastructures/middlewares/validation.middleware'
import createValidator from '../validators/createComment.validator'
import updateValidator from '../validators/updateComment.validator'
import readValidator from '../validators/readComment.validator'
import deleteValidator from '../validators/deleteComment.validator'

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
      .patch(validate(updateValidator), this.updateComment)
      .delete(this.deleteComment)

    this.router
      .route(this.path)
      .get(validate(readValidator), this.readComment)
      .post(validate(createValidator), this.createComment)
  }

  private async readComment(req: Request, res: Response, next: NextFunction) {
    const readDTO :readValidator = { 
      postId : Number(req.body.postId)
    }

    return Read(readDTO)
    .then((commentList)=>res.status(200).json(commentList))
    .catch((err) => {
      console.error(err)
      next(new PromiseRejectionException())
    })
  }

  private async createComment(req: Request, res: Response, next: NextFunction) {
    const createDTO : createValidator = { 
      postId : Number(req.body.postId),
      nickname: req.body.nickname,
      content: req.body.content
    }

    return Create(createDTO)
    .then((newComment)=>res.status(201).json(newComment))
    .catch((err) =>{
      console.error(err)
      next(new PromiseRejectionException())
    })
  }

  private async updateComment(req: Request, res: Response, next: NextFunction) {
    const updateDTO : updateValidator = {
      commentId: Number(req.body.commentId),
      content: req.body.content
    }

     return Update(updateDTO)
      .then((modifiedComment)=> res.status(200).json(modifiedComment))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private async deleteComment(req: Request, res: Response, next: NextFunction) {
    const deleteDTO : deleteValidator = {
      commentId: Number(req.params.commentId)
    } 

    return  Delete(deleteDTO)
    .then(() => res.status(200).json({ isDeleted: true }))
    .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
    })
  }
}
