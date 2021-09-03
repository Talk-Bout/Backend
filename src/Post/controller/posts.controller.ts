import { NextFunction, Request, Response, Router } from 'express'
import { validate } from '../../Infrastructures/middlewares'
import { Controller } from '../../Infrastructures/interfaces'
import authenticate from '../../Infrastructures/middlewares/authentication.middleware'
import {
  CreatePostValidator,
  UpdatePostValidator,
  PostJunctionValidator
} from '../validators'
import {
  createPost,
  readPost,
  updatePost,
  deletePost,
  detailPost,
  popularPost,
  createPostLike,
  deletePostLike,
  createPostBookmark,
  deletePostBookmark
} from '../services'
import prismaException from '../../Infrastructures/utils/prismaException'
import isProper from '../../Infrastructures/utils/isProper'

export default class PostsController implements Controller {
  public readonly router = Router()
  public readonly path = '/api/posts'
  public readonly likePath = '/api/posts/:postId/postLikes'
  public readonly bookmarkPath = '/api/posts/:postId/postBookmarks'
  public readonly popularPath = '/api/popular/posts'

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .route(this.path)
      .get(this.getPost)
      .post(authenticate(), validate(CreatePostValidator), isProper(), this.postPost)

    this.router
      .route(this.path + '/:postId')
      .get(this.detailPost)
      .patch(authenticate(), validate(UpdatePostValidator), isProper(), this.patchPost)
      .delete(authenticate(), this.deletePost)

    this.router
      .route(this.likePath)
      .post(authenticate(), validate(PostJunctionValidator), this.postPostLike)
      .delete(authenticate(), this.deletePostLike)

    this.router
      .route(this.bookmarkPath)
      .post(authenticate(), validate(PostJunctionValidator), this.postPostBookmark)
      .delete(authenticate(), this.deletePostBookmark)

    this.router.route(this.popularPath).get(this.popularPost)
  }

  private postPost(req: Request, res: Response, next: NextFunction) {
    const requestObject: CreatePostValidator = {
      nickname: String(req.user),
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      image: req.body.image || null
    }

    return createPost(requestObject)
      .then((post) => res.status(201).json(post))
      .catch((err) => prismaException(err, next))
  }

  private getPost(req: Request, res: Response, next: NextFunction) {
    const page: number = Number(req.query.page)
    const category: string | undefined = req.query.category as string

    return readPost(category, page)
      .then((posts) => res.status(200).json(posts))
      .catch((err) => prismaException(err, next))
  }

  private detailPost(req: Request, res: Response, next: NextFunction) {
    const postId: number = Number(req.params.postId)

    return detailPost(postId)
      .then((post) => res.status(200).json(post))
      .catch((err) => prismaException(err, next))
  }

  private patchPost(req: Request, res: Response, next: NextFunction) {
    const postId: number = Number(req.params.postId)
    const user = String(req.user)
    const requestObject: UpdatePostValidator = {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      image: req.body.image || null
    }

    return updatePost(postId, user, requestObject)
      .then((post) => res.status(200).json(post))
      .catch((err) => prismaException(err, next))
  }

  private deletePost(req: Request, res: Response, next: NextFunction) {
    const postId: number = Number(req.params.postId)
    const user: string = String(req.user)

    return deletePost(postId, user)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => prismaException(err, next))
  }

  private popularPost(req: Request, res: Response, next: NextFunction) {
    const page: number = Number(req.query.page)
    const category: string | undefined = req.query.category as string

    return popularPost(category, page)
      .then((posts) => res.status(200).json(posts))
      .catch((err) => prismaException(err, next))
  }

  private postPostLike(req: Request, res: Response, next: NextFunction) {
    const requestObject: PostJunctionValidator = {
      nickname: String(req.user),
      postId: req.body.postId
    }

    return createPostLike(requestObject)
      .then((like) => res.status(200).json(like))
      .catch((err) => prismaException(err, next))
  }

  private deletePostLike(req: Request, res: Response, next: NextFunction) {
    const requestObject: PostJunctionValidator = {
      postId: Number(req.params.postId),
      nickname: String(req.user)
    }

    return deletePostLike(requestObject)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => prismaException(err, next))
  }

  private postPostBookmark(req: Request, res: Response, next: NextFunction) {
    const requestObject: PostJunctionValidator = {
      nickname: String(req.user),
      postId: req.body.postId
    }

    return createPostBookmark(requestObject)
      .then((bookmark) => res.status(200).json(bookmark))
      .catch((err) => prismaException(err, next))
  }

  private deletePostBookmark(req: Request, res: Response, next: NextFunction) {
    const requestObject: PostJunctionValidator = {
      postId: Number(req.params.postId),
      nickname: String(req.user)
    }

    return deletePostBookmark(requestObject)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => prismaException(err, next))
  }
}
