import express, { NextFunction, Request, Response } from 'express'
import Controller from '../../Infrastructures/interfaces/controller.interface'
import Read from '../services/comment.read'
import Create from '../services/comment.create'
import Update from '../services/comment.update'
import Delete from '../services/comment.delete'
import PromiseRejectionException from '../../Infrastructures/exceptions/PromiseRejection.exception'
import ValidationFailureException from '../../Infrastructures/exceptions/ValidationFailure.exception'
import validationMiddleware from '../../Infrastructures/middlewares/validation.middleware'
import createCommentValidator from '../validators/createComment.validator'
import deleteCommentValidator from '../validators/deleteComment.validator'
import updateCommentValidator from '../validators/updateComment.validator'
import readCommentValidator from '../validators/readComment.validator'



export default class CommentsController implements Controller {

  public readonly path = '/posts/:postId/comments'
  public readonly idPath = '/posts/:postId/comments/:commentId'
  public readonly router = express.Router()
  public readonly path2 = '/test'

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {


    this.router
      .route(this.idPath)
      .patch(validationMiddleware(updateCommentValidator),this.updateComment)
      .delete(validationMiddleware(deleteCommentValidator),this.deleteComment)

    this.router
      .route(this.path)
      .get(validationMiddleware(readCommentValidator),this.readComment)
      .post(validationMiddleware(createCommentValidator), this.createComment)
    
  }


  private readComment(req: Request, res: Response, next: NextFunction) {
    const DTO :readCommentValidator  = { postId : parseInt(req.body.postId)}

    return Read(DTO)
    .then((commentList)=>res.status(200).json(commentList))
    .catch((err) =>
      {console.error(err)
      next(new PromiseRejectionException())
    })
  }


  //const { postId, nickname, content } = req.body
    // if (!nickname || !content || !postId) {
    //   next(new ValidationFailureException())
    // }
  private  createComment(req: Request, res: Response, next: NextFunction) {
  
    const DTO : createCommentValidator ={ 

      postId : Number(req.body.postId),
      nickname: req.body.nickname,
      content: req.body.content
     }
   
    return Create(DTO)
    .then((newComment)=>res.status(201).json(newComment))
    .catch((err) =>{
      console.error(err)
      next(new PromiseRejectionException())
    })  
  }


  private updateComment(req: Request, res: Response, next: NextFunction) {
    // const { commentId, nickname, content } = req.body
    // if (!commentId || !nickname || !content) {
    //   next(new ValidationFailureException())
    // }
    const DTO : updateCommentValidator= {
      commentId: Number(req.body.commentId),
      content: req.body.content
    }
     return Update(DTO)
     .then((modifiedComment)=> res.status(200).json(modifiedComment))
     .catch((err) => {
      console.error(err)
      next(new PromiseRejectionException())
    })
  }

  private deleteComment(req: Request, res: Response, next: NextFunction) {
   

    const DTO : deleteCommentValidator= {commentId: parseInt(req.body.commentId)} 
    console.log(DTO)
    console.log("check chek ")
    return  Delete(DTO)
    .then(()=> res.status(200).json({ deleted: true }))
    .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })

    
  }
}
