import { NextFunction, Request, Response, Router } from 'express'
import { Controller } from '../../Infrastructures/interfaces'
import { validate } from '../../Infrastructures/middlewares'
import { UpdateUserValidator } from '../validators'
import cors from 'cors'
import {
  updateUser,
  deleteUser,
  readNickname,
  readMyPosts,
  readMyPostBookmarks,
  readMyBootcampBookmarks,
  readMyCommunityBookmarks,
  readMyQuestionBookmarks
} from '../services'
import prismaException from '../../Infrastructures/utils/prismaException'
import authenticate from '../../Infrastructures/middlewares/authentication.middleware'

export default class UsersController implements Controller {
  public readonly path = '/api/users'
  public readonly router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .route(this.path + '/:nickname')
      .get(authenticate(), this.readNickname)
      .patch(authenticate(), validate(UpdateUserValidator), this.updateUser)
      .post(authenticate(), this.deleteUser)

    this.router.route(this.path + '/:nickname/posts').get(authenticate(), this.getMyPosts)

    this.router
      .route(this.path + '/:nickname/postBookmarks')
      .get(authenticate(), this.getMyPostBookmarks)

    this.router
      .route(this.path + '/:nickname/bootcampBookmarks')
      .get(authenticate(), this.getMyBootcampBookmarks)

    this.router
      .route(this.path + '/:nickname/communityBookmarks')
      .get(authenticate(), this.getMyCommunityBookmarks)

    this.router
      .route(this.path + '/:nickname/questionBookmarks')
      .get(authenticate(), this.getMyQuestionBookmarks)

    this.router
      .route(this.path + '/:nickname/allBookmarks')
      .get(authenticate(), this.getMyAllBookmarks)
  }

  private readNickname(req: Request, res: Response, next: NextFunction) {
    const nickname = { nickname: req.params.nickname }
    console.log(nickname)
    return readNickname(nickname)
      .then(() => res.status(200).json({ isExist: true }))
      .catch((err) => prismaException(err, next))
  }

  private updateUser(req: Request, res: Response, next: NextFunction) {
    const user = String(req.user)
    const requestObject: UpdateUserValidator = {
      nickname: req.body.nickname,
      profilePic: req.body.profilePic || null,
      role: req.body.role || null
    }

    return updateUser(user, requestObject)
      .then(() => res.status(200).json({ isUpdated: true }))
      .catch((err) => prismaException(err, next))
  }

  private deleteUser(req: Request, res: Response, next: NextFunction) {
    const nickname = {
      nickname: String(req.user)
    }
    const requestObject = {
      nickname: String(req.user),
      content: req.body.content
    }

    return deleteUser(nickname, requestObject)
      .then((result) => res.status(200).json({ isDeleted: result ? true : false }))
      .catch((err) => prismaException(err, next))
  }

  private getMyPosts(req: Request, res: Response, next: NextFunction) {
    const nickname = {
      nickname: String(req.user)
    }

    return readMyPosts(nickname)
      .then((posts) => res.status(200).json(posts))
      .catch((err) => prismaException(err, next))
  }

  private getMyPostBookmarks(req: Request, res: Response, next: NextFunction) {
    const nickname = {
      nickname: String(req.user)
    }

    return readMyPostBookmarks(nickname)
      .then((bookmarks) => res.status(200).json(bookmarks))
      .catch((err) => prismaException(err, next))
  }

  private getMyBootcampBookmarks(req: Request, res: Response, next: NextFunction) {
    const nickname = {
      nickname: String(req.user)
    }

    return readMyBootcampBookmarks(nickname)
      .then((bookmarks) => res.status(200).json(bookmarks))
      .catch((err) => prismaException(err, next))
  }

  private getMyCommunityBookmarks(req: Request, res: Response, next: NextFunction) {
    const nickname = {
      nickname: String(req.user)
    }

    return readMyCommunityBookmarks(nickname)
      .then((bookmarks) => res.status(200).json(bookmarks))
      .catch((err) => prismaException(err, next))
  }

  private getMyQuestionBookmarks(req: Request, res: Response, next: NextFunction) {
    const nickname = {
      nickname: String(req.user)
    }

    return readMyQuestionBookmarks(nickname)
      .then((bookmarks) => res.status(200).json(bookmarks))
      .catch((err) => prismaException(err, next))
  }

  private async getMyAllBookmarks(req: Request, res: Response, next: NextFunction) {
    const nickname = {
      nickname: String(req.user)
    }

    const questionBookmarks = await readMyQuestionBookmarks(nickname).catch((err) =>
      prismaException(err, next)
    )
    const postBookmarks = await readMyPostBookmarks(nickname).catch((err) =>
      prismaException(err, next)
    )

    return res.status(200).json({
      questionBookmarks,
      postBookmarks
    })
  }
}
