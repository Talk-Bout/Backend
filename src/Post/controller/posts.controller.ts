import express, { NextFunction, Request, Response } from 'express'
import Controller from '../../Infrastructures/interfaces/controller.interface'
import validate from '../../Infrastructures/middlewares/validation.middleware'
import createValidator from '../validators/createPost.validator'
import readValidator from '../validators/readPost.validator'
import deleteValidator from '../validators/deletePost.validator'
import updateValidator from '../validators/updatePost.validator'
import detailValidator from '../validators/readDetail.validator'
import PromiseRejectionException from '../../Infrastructures/exceptions/PromiseRejection.exception'
import Create from '../services/post.create'
import Read from '../services/post.read'
import Update from '../services/post.update'
import Delete from '../services/post.delete'
import Detail from '../services/post.detail'
import authenticate from '../../Infrastructures/middlewares/authentication.middleware'

export default class PostsController implements Controller {
  public readonly path = '/posts'
  public readonly router = express.Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .route(this.path)
      .get(this.readPost)
      .post(validate(createValidator), this.createPost)

    this.router
      .route(this.path + '/:postId')
      .get(validate(detailValidator), this.readDetail)
      .patch(validate(updateValidator), this.updatePost)
      .delete(this.deletePost)
  }

  private createPost(req: Request, res: Response, next: NextFunction) {
    const createDTO: createValidator = {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      nickname: req.body.nickname,
      image: req.body.image
    }
    
    return Create(createDTO)
      .then(() => res.status(201).json({ isCreated: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private readPost(req: Request, res: Response, next: NextFunction) {
    const readDTO: readValidator = {
      category: req.body.category || undefined
    }

    return Read(readDTO)
      .then((posts) => res.status(200).json(posts))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private readDetail(req: Request, res: Response, next: NextFunction) {
    const detailDTO: detailValidator = {
      postId: Number(req.body.postId)
    }

    return Detail(detailDTO)
      .then((post) => res.status(200).json(post))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private deletePost(req: Request, res: Response, next: NextFunction) {
    const deleteDTO: deleteValidator = {
      postId: Number(req.params.postId)
    }

    return Delete(deleteDTO)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private updatePost(req: Request, res: Response, next: NextFunction) {
    const updateDTO: updateValidator = {
      title: req.body.title,
      postId: Number(req.body.postId),
      content: req.body.content,
      category: req.body.category,
      image: req.body.image
    }

    return Update(updateDTO)
      .then(() => res.status(200).json({ isUpdated: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }
}
