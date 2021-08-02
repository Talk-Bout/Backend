import { NextFunction, Request, Response, Router } from 'express'
import Controller from '../interfaces/controller.interface'
import validationMiddleware from '../middlewares/validation.middleware'
import createUserValidator from '../validators/createUser.validator'
import checkUserValidator from '../validators/checkUser.validator'
import ValidationFailureException from '../exceptions/ValidationFailure.exception'
import PromiseRejectionException from '../exceptions/PromiseRejection.exception'
import PageNotFoundException from '../exceptions/PageNotFound.exception'
import User from '../interfaces/user.interface'
import userCreate from './features/user.create'
import userCheck from './features/user.check'

export default class UsersController implements Controller {
  public readonly path = '/users'
  public readonly router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .route(this.path)
      .get(validationMiddleware(checkUserValidator), this.checkUser)
      .post(validationMiddleware(createUserValidator), this.createUser)
  }

  private async createUser(req: Request, res: Response, next: NextFunction) {
    if (req.body.password != req.body.confirmPassword) {
      next(() => new ValidationFailureException())
    }

    const createUserDTO: User = {
      nickname: req.body.nickname,
      email: req.body.email,
      password: req.body.password
    }

    const newUser = await userCreate(createUserDTO).catch(() =>
      next(new PromiseRejectionException())
    )
    return res.status(201).json(newUser)
  }

  private async checkUser(req: Request, res: Response, next: NextFunction) {
    const checkUserDTO =
      (req.body.nickname as string) || (req.body.email as string)

    const foundUser = await userCheck(checkUserDTO).catch(() =>
      next(new PromiseRejectionException())
    )

    if (foundUser) return res.status(200).json({ isExist: true })
    else return res.status(200).json({ isExist: false })
  }
}
