import { NextFunction, Request, Response, Router } from 'express'
import { Controller } from '../../Infrastructures/interfaces'
import { validate } from '../../Infrastructures/middlewares'
import {
  PromiseRejectionException,
  ValidationFailureException
} from '../../Infrastructures/exceptions'
import {
  CreateUserValidator,
  UpdateUserValidator,
  EmailValidator,
  NicknameValidator,
  DeleteUserValidator
} from '../validators'
import {
  createUser,
  updateUser,
  deleteUser,
  readEmail,
  readNickname,
  readMyPosts,
  readMyPostBookmarks,
  readMyBootcampBookmarks,
  readMyCommunityBookmarks,
  readMyQuestionBookmarks
} from '../services'

export default class UsersController implements Controller {
  public readonly path = '/users'
  public readonly router = Router()

  constructor() {
    this.initializeRoutes()
  }

  // read북마크s => 북마크 인덱스 => "북마크 데이터"
  // get 요청 닉네임 어떻게 validate할래?
  // plainToClass 정말 필요한 거 맞아?

  private initializeRoutes() {
    this.router
      .route(this.path)
      .post(validate(CreateUserValidator), this.postUser)

    this.router.route(this.path + '/email/:email').get(this.getEmailExist)

    this.router
      .route(this.path + '/nickname/:nickname')
      .get(this.getNicknameExist)

    this.router
      .route(this.path + '/:nickname')
      .patch(validate(UpdateUserValidator), this.updateUser)
      .post(this.deleteUser)

    this.router.route(this.path + '/:nickname/posts').get(this.getMyPosts)

    this.router
      .route(this.path + '/:nickname/postBookmarks')
      .get(this.getMyPostBookmarks)

    this.router
      .route(this.path + '/:nickname/bootcampBookmarks')
      .get(this.getMyBootcampBookmarks)

    this.router
      .route(this.path + '/:nickname/communityBookmarks')
      .get(this.getMyCommunityBookmarks)

    this.router
      .route(this.path + '/:nickname/questionBookmarks')
      .get(this.getMyQuestionBookmarks)
  }

  private postUser(req: Request, res: Response, next: NextFunction) {
    const createUserDTO: CreateUserValidator = {
      nickname: req.body.nickname,
      email: req.body.email,
      password: req.body.password
    }

    if (req.body.password != req.body.confirmPassword) {
      next(new ValidationFailureException())
    }

    return createUser(createUserDTO)
      .then(() => res.status(201).json({ isCreated: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private getEmailExist(req: Request, res: Response, next: NextFunction) {
    const email: EmailValidator = {
      email: req.params.email
    }

    return readEmail(email)
      .then((exist) => res.status(200).json({ isExist: exist ? true : false }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private getNicknameExist(req: Request, res: Response, next: NextFunction) {
    const nickname: NicknameValidator = {
      nickname: req.params.nickname
    }

    return readNickname(nickname)
      .then((exist) => res.status(200).json({ isExist: exist ? true : false }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private updateUser(req: Request, res: Response, next: NextFunction) {
    const updateUserDTO: UpdateUserValidator = {
      nickname: req.body.nickname,
      password: req.body.password,
      email: req.body.email,
      profilePic: req.body.profilePic || null,
      role: req.body.role || null
    }

    return updateUser(updateUserDTO)
      .then(() => res.status(200).json({ isUpdated: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private deleteUser(req: Request, res: Response, next: NextFunction) {
    const deleteUserDTO: DeleteUserValidator = {
      nickname: req.params.nickname,
      content: req.body.content
    }

    return deleteUser(deleteUserDTO)
      .then((result) => {
        res.status(200).json({ isDeleted: result ? true : false })
      })
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private getMyPosts(req: Request, res: Response, next: NextFunction) {
    const nickname: NicknameValidator = {
      nickname: req.params.nickname
    }

    return readMyPosts(nickname)
      .then((posts) => res.status(200).json(posts))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private getMyPostBookmarks(req: Request, res: Response, next: NextFunction) {
    const nickname: NicknameValidator = {
      nickname: req.params.nickname
    }

    return readMyPostBookmarks(nickname)
      .then((bookmarks) => res.status(200).json(bookmarks))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private getMyBootcampBookmarks(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const nickname: NicknameValidator = {
      nickname: req.params.nickname
    }

    return readMyBootcampBookmarks(nickname)
      .then((bookmarks) => res.status(200).json(bookmarks))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private getMyCommunityBookmarks(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const nickname: NicknameValidator = {
      nickname: req.params.nickname
    }

    return readMyCommunityBookmarks(nickname)
      .then((bookmarks) => res.status(200).json(bookmarks))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private getMyQuestionBookmarks(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const nickname: NicknameValidator = {
      nickname: req.params.nickname
    }

    return readMyQuestionBookmarks(nickname)
      .then((bookmarks) => res.status(200).json(bookmarks))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }
}
