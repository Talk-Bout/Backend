import { Router, Request, Response, NextFunction } from 'express'
import Controller from '../../Infrastructures/interfaces/controller.interface'
import PromiseRejectionException from '../../Infrastructures/exceptions/PromiseRejection.exception'
import validate from '../../Infrastructures/middlewares/validation.middleware'
import loginValidator from '../validators/login.validator'
import login from '../services/login'
import crypto from '../../Infrastructures/utils/crypto'
import jwt from '../../Infrastructures/utils/generateToken'

export default class AuthController implements Controller {
  public readonly path = '/login'
  public readonly router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(this.path, validate(loginValidator), this.login)
  }

  private async login(req: Request, res: Response, next: NextFunction) {
    const loginDTO: loginValidator = {
      email: req.body.email,
      password: req.body.password
    }

    const user = await login(loginDTO)
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })

    if (user) {
      const authenticationDTO = {
        nickname: user?.nickname,
        email: user?.email,
        token: jwt(user?.nickname as string)
      }
      return res.status(200).json(authenticationDTO)
    } else {
      return res.status(400).json({ login: "failed" })
    }
  }
}
