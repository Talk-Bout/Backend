import express, { NextFunction, Request, Response } from 'express'
import Controller from '../interfaces/controller.interface'
import Post from '../interfaces/post.interface'
import updatedPost from '../interfaces/updatedpost.interface'
import like from '../interfaces/like'
import validationMiddleware from '../middlewares/validation.middleware'
import createPostValidator from '../validators/createPost.validator'
import createUpdatedPostValidator from '../validators/updatedPost.validator copy'
import PromiseRejectionException from '../exceptions/PromiseRejection.exception'
import postCreate from './features/post.create'
import checkPost from './features/post.read'
import updatePost from './features/post.update'
import deletePost from './features/post.delete'
import getPostDetail from './features/post.detail'
import getMyPostDetail from './features/mypost.detail'
import likePost from './features/like'
import unlikePost from './features/unlike'




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
      .get(this.getPost)
      .get(this.getMyPost)
 
    this.router 
      .route(`${this.path}/:postId`)
      .patch(validationMiddleware(createUpdatedPostValidator),this.updatePost)
      .delete(this.deletePost)
      .get(this.getPostDetail)
      .post(this.likPost)
  
  }

  private async createPost(req: Request, res: Response, next: NextFunction) {
    const createPostDTO: Post ={
        title : req.body.title,
        content : req.body.content,
        category : req.body.category,
        nickname: req.body.nickname,
    }
    const newPost = await postCreate(createPostDTO)
    .catch(()=>next(new PromiseRejectionException()))
    return res.status(201).json(newPost)
  }

  private async getPost(req: Request, res: Response, next: NextFunction) {
    const categoryDTO = req.body.category
    const posts = await checkPost(categoryDTO)
    .catch(()=>next(new PromiseRejectionException()))
    return res.status(200).json(posts)
  }


  private async deletePost(req: Request, res: Response, next: NextFunction) {
    const deleteDTO= req.body.postId
    await deletePost(deleteDTO)
    .catch(()=>next(new PromiseRejectionException()))
    return res.status(200).json({ msg : "successfully deleted"})
  }



    private async updatePost(req: Request, res: Response, next: NextFunction) {
    const updateDTO: updatedPost = {
      postId : parseInt(req.body.postId),
      content: req.body.content
    } 
    const updatedPost = await updatePost(updateDTO)
    .catch(()=>next(new PromiseRejectionException()))
    return res.status(200).json(updatedPost)
    
   }

  private async getPostDetail(req: Request, res: Response, next: NextFunction) {
    const detailDTO = req.body.postId
    
    const post = await getPostDetail(detailDTO)
    .catch(()=>next (new PromiseRejectionException()))
    return res.status(200).json(post)
   
  }

  private async getMyPost(req: Request, res: Response, next: NextFunction) {
    const writerDTO = req.body.nickname
    
    const posts = await getMyPostDetail(writerDTO)
    .catch(()=>next (new PromiseRejectionException()))
    return res.status(200).json(posts)
   
  }


  private async likPost(req: Request, res: Response, next: NextFunction) {
    
    const like = req.body.like

    const likeDTO: like = {
      nickname: req.body.nickname,
      postId: parseInt(req.body.postId)
    }

    if(like === true){
    const like = await likePost(likeDTO)
    .catch(()=>next (new PromiseRejectionException()))
    return res.status(200).json({like:true})
    }else if(like == false){
      const unlike = await unlikePost(likeDTO)
      .catch(()=>next (new PromiseRejectionException()))
      return res.status(200).json({like:false})
    }

  }

}
