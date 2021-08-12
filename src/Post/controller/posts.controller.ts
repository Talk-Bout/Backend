import { NextFunction, Request, Response, Router } from 'express'
import { validate } from '../../Infrastructures/middlewares'
import { Controller } from '../../Infrastructures/interfaces'
import { PromiseRejectionException } from '../../Infrastructures/exceptions'
import { CreatePostValidator, UpdatePostValidator, CreatePostJunctionValidator } from '../validators'
import { createPost, readPost, updatePost, deletePost, detailPost, readPopular,
  createPostLike, deletePostLike, createPostBookmark, deletePostBookmark } from '../services'

export default class PostsController implements Controller {
  public readonly router = Router()
  public readonly path = '/posts'
  public readonly popularPath = '/popular/posts'
  public readonly likePath = '/posts/:postId/postLikes'
  public readonly bookmarkPath = '/posts/:postId/postBookmarks'

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route(this.path)
      .get(this.getPost)
      .post(validate(CreatePostValidator), this.postPost)

    this.router.route(this.path + '/:postId')
      .get(this.detailPost)
      .patch(validate(UpdatePostValidator), this.patchPost)
      .delete(this.deletePost)

    this.router.route(this.likePath)
      .post(validate(CreatePostJunctionValidator), this.postPostLike)

    this.router.route(this.likePath + '/:postLikeId')
      .delete(this.deletePostLike)

    this.router.route(this.bookmarkPath)
      .post(validate(CreatePostJunctionValidator), this.postPostBookmark)

    this.router.route(this.bookmarkPath + '/:postBookmarkId')
      .delete(this.deletePostBookmark)

    this.router.route(this.popularPath)
      .get(this.getPostPopular)  
  }


  private getPostPopular(req: Request, res: Response, next: NextFunction) {
    readPopular().then((posts)=> res.status(200).json(posts))
    
  }



  private postPost(req: Request, res: Response, next: NextFunction) {
    const createPostDTO: CreatePostValidator = {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      nickname: req.body.nickname,
      image: req.body.image
    }

    return createPost(createPostDTO)
      .then((post) => res.status(201).json(post))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private getPost(req: Request, res: Response, next: NextFunction) {
    const page: number = Number(req.query.page)
    const category: string | undefined = (req.query.category as string) || undefined

    return readPost(category, page) // TEST
      .then((posts) => res.status(200).json(posts))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private detailPost(req: Request, res: Response, next: NextFunction) {
    const postId: number = Number(req.params.postId)

    return detailPost(postId)
      .then((post) => res.status(200).json(post))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private patchPost(req: Request, res: Response, next: NextFunction) {
    const postId: number = Number(req.params.postId)
    const updateDTO: UpdatePostValidator = {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      image: req.body.image
    }

    return updatePost(postId, updateDTO)
      .then((post) => res.status(200).json(post))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private deletePost(req: Request, res: Response, next: NextFunction) {
    const postId: number = Number(req.params.postId)

    return deletePost(postId)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private postPostLike(req: Request, res: Response, next: NextFunction) {
    const createPostLikeDTO: CreatePostJunctionValidator = {
      nickname: req.body.nickname,
      postId: req.body.postId
    }

    return createPostLike(createPostLikeDTO)
      .then((like) => res.status(200).json(like))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private deletePostLike(req: Request, res: Response, next: NextFunction) {
    const postLikeId: number = Number(req.params.postLikeId)

    return deletePostLike(postLikeId)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private postPostBookmark(req: Request, res: Response, next: NextFunction) {
    const createPostBookmarkDTO: CreatePostJunctionValidator = {
      nickname: req.body.nickname,
      postId: req.body.postId
    }

    return createPostBookmark(createPostBookmarkDTO)
      .then((bookmark) => res.status(200).json(bookmark))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private deletePostBookmark(req: Request, res: Response, next: NextFunction) {
    const postBookmarkId: number = Number(req.params.postBookmarkId)

    return deletePostBookmark(postBookmarkId)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }
}
