import express, { NextFunction, Request, Response } from 'express'
import Controller from '../interfaces/controller.interface'
import userCreate from './features/user.create'

export default class UsersController implements Controller {
  public readonly path = '/users'
  public readonly router = express.Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(this.path, this.createUser)
    this.router.get(this.path, this.checkDuplication)
  }

  private createUser(req: Request, res: Response, next: NextFunction) {
    userCreate(req, res, next)
  }

  private checkDuplication(req: Request, res: Response, next: NextFunction) {
    // ...
  }
}
