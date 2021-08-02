import express, { NextFunction, Request, Response } from 'express'
import Controller from '../interfaces/controller.interface'
import postCreate from './features/post.create'
//import checkPost from './features/post.read'
import validationMiddleware from '../middlewares/validation.middleware'
import createPostValidator from '../validators/createPost.validator'
//import updatePost from './features/post.update'
// import deletePost from './features/post.delete'
//import getPostDetail from './features/post.detail'
import PromiseRejectionException from '../exceptions/PromiseRejection.exception'
import Post from '../interfaces/post.interface'

export default class PostsController implements Controller {
  public readonly path = '/posts'
  public readonly router = express.Router()
  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
    .route(this.path)
    .post(validationMiddleware(createPostValidator),this.createPost)
    //this.router.get(this.path, this.getPost)
    // this.router.get(`{this.path}/:postId`, this.getPostDetail)
    // this.router.patch(`{this.path}/:postId`, this.updatePost)
    // this.router.delete(`{this.path}/:postId`, this.deletePost)
  }

  private async createPost(req: Request, res: Response, next: NextFunction) {
  
    const createPostDTO: Post ={
        title : req.body.title,
        content : req.body.content,
        category : req.body.category,
        //createdAt: Date.now(),
        nickname: req.body.nickname,
    }
    const newPost = await postCreate(createPostDTO)
    //.then(()=> res.status(201).json(newPost))
    .catch(()=>next(new PromiseRejectionException()))
    return res.status(201).json(newPost)
  }

  // postCreate(createPostDTO).then((potato)=> res.status(201).json(potato))
  // .catch(()=>next(new PromiseRejectionException()))

  // private getPost(req: Request, res: Response, next: NextFunction) {
  //   const getPostDTO = req.body.category
  //   checkPost(getPostDTO)
  // }



//   private getPostDetail(req: Request, res: Response, next: NextFunction) {
//     getPostDetail(req, res, next)
//   }
//   private updatePost(req: Request, res: Response, next: NextFunction) {
//     updatePost(req, res, next)
// //   }
//   private deletePost(req: Request, res: Response, next: NextFunction) {
//     deletePost(req, res, next)
//   }
}
