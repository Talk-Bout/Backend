import { NextFunction, Request, Response, Router } from 'express'
import Controller from '../../Infrastructures/interfaces/controller.interface'
import validate from '../../Infrastructures/middlewares/validation.middleware'
import createValidator from '../validators/createUser.validator'
import updateValidator from '../validators/updateUser.validator'
import readEmailValidator from '../validators/readEmail.validator'
import readNicknameValidator from '../validators/readNickname.validator'
import nicknameValidator from '../validators/nickname.validator'
import ValidationFailureException from '../../Infrastructures/exceptions/ValidationFailure.exception'
import PromiseRejectionException from '../../Infrastructures/exceptions/PromiseRejection.exception'
import Create from '../services/user.create'
import readEmail from '../services/email.read'
import readNickname from '../services/nickname.read'
import readMyPosts from '../services/myPosts.read' 
import readMYBookmark from '../services/myBookmark.read'
import updateUser from '../services/user.update'
import deleteUser from '../services/user.delete'
import { generateHash } from '../../Infrastructures/utils/bcrypy'

import authenticate from '../../Infrastructures/middlewares/authentication.middleware'

export default class UsersController implements Controller {
  public readonly path = '/users'
  public readonly router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .route(this.path)
      .post(validate(createValidator), this.createUser)
    
    this.router
      .route(this.path + '/email/:email')
      .get(validate(readEmailValidator), this.readEmailExist)

    this.router
      .route(this.path + '/nickname/:nickname')
      .get(validate(readNicknameValidator), this.readNicknameExist)
      .patch(validate(nicknameValidator), this.updateUser)
      .delete(validate(nicknameValidator), this.deleteUser)

    this.router
      .route(this.path + '/:nickname/posts')
      .get(validate(nicknameValidator), this.getMyPosts)

    this.router
      .route(this.path + '/nickname/:bookmark')
      .get(validate(nicknameValidator), this.getMyBookmark)

  }

  private createUser(req: Request, res: Response, next: NextFunction) {
    const createDTO: createValidator = {
      nickname: req.body.nickname,
      email: req.body.email,
      password: generateHash(req.body.password)
    }

    if (req.body.password != req.body.confirmPassword) {
      next(new ValidationFailureException())
    }

    return Create(createDTO)
      .then(() => res.status(201).json({ isCreated: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private readEmailExist(req: Request, res: Response, next: NextFunction) {
    const readEmailDTO: readEmailValidator = {
      email: req.body.email
      
    }

    return readEmail(readEmailDTO)
      .then((exist) => res.status(200).json({isExist: exist ? true : false}))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private readNicknameExist(req: Request, res: Response, next: NextFunction) {
    const readNicknameDTO: readNicknameValidator = {
      nickname: req.body.nickname
    }

    return readNickname(readNicknameDTO)
      .then((exist) => res.status(200).json({isExist: exist ? true : false}))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }
  private updateUser (req: Request, res: Response, next: NextFunction) {
    const updateUserDTO: updateValidator = {
      nickname: req.body.nickname,
      password: req.body.password,
      email:req.body.email
    }
    
    updateUser(updateUserDTO)
    .then((result)=>res.status(200).json({isUpdated: result?  true: false}))
    .catch((err) => {
      console.error(err)
      next(new PromiseRejectionException())
    })
  }
  

  private deleteUser (req: Request, res: Response, next: NextFunction) {
    const deleteUserDTO: nicknameValidator = {nickname: req.body.nickname}
    deleteUser(deleteUserDTO)
    .then((result)=>res.status(200).json({isDeleted: result? true: false}))
    .catch((err) => {
      console.error(err)
      next(new PromiseRejectionException())
    })
  }





  private getMyPosts(req: Request, res: Response, next: NextFunction) {
    const myPostDTO: nicknameValidator = {
      nickname: req.body.nickname
    }

    return readMyPosts(myPostDTO)
      .then((posts) => res.status(200).json(posts))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }


  private getMyBookmark(req: Request, res: Response, next: NextFunction) {
    const myBookmarkDTO: nicknameValidator = {
      nickname: req.body.nickname
    }

    readMYBookmark(myBookmarkDTO)
  }

}