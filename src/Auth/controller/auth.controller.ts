import { Router, Request, Response, NextFunction } from 'express'
import Controller from '../../Infrastructures/interfaces/controller.interface'
import PromiseRejectionException from '../../Infrastructures/exceptions/PromiseRejection.exception'
import validate from '../../Infrastructures/middlewares/validation.middleware'
import loginValidator from '../validators/login.validator'
import login from '../services/login'
import loginSkyler from '../services/loginskyler'
import crypto from '../../Infrastructures/utils/crypto'
import authenticateA from '../../Infrastructures/middlewares/authentication.middleware'
import jwt from '../../Infrastructures/utils/generateToken'
import { generateHash, compareHash } from '../../Infrastructures/utils/bcrypy'
import { authenticate} from 'passport'
import * as passport from 'passport'
//import passportLocalStrategy from '../../Infrastructures/middlewares/passportStrategy1'
 
export default class AuthController implements Controller {
  public readonly path = '/login'
  public readonly path2 = '/loginSkyler2'
  public readonly path3 = '/loginSkyler3'
  public readonly router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(this.path, validate(loginValidator), this.login)
    this.router.post(this.path2, this.loginSkyler2)
    this.router.post(this.path3, passportLocalStrategy, this.loginSkyler3)
    this.router.get('/tokenUser', authenticateA, this.tokenUser)
  }



  private async loginSkyler3 (req: Request, res: Response, next: NextFunction) {
    
    
    res.json("pizza")
    // try {

    //   const user = await loginSkyler(loginSkylerDTO)
      
    //   if(user){
    //     const authenticationDTO = {
    //       nickname: user?.nickname,
    //       email: user?.email,
    //       token: jwt(user?.nickname as string)
    //     }
    //     return res.status(200).json(authenticationDTO)
    //   }else {
    //     return res.status(400).json({ login: "failed" })
    //   }
      
    // } catch (error) {
    //     console.log(error, "fucker")
    //     res.status(500).json({message: "아이디 혹은 비밀번호가 틀립니다."})
    // }
  }

  private async loginSkyler2 (req: Request, res: Response, next: NextFunction) {
    
      const email = req.body.email
      const password = req.body.password

      console.log(email,password)

      const loginSkylerDTO ={
        email,
        password
      }


      
      try {

        const user = await loginSkyler(loginSkylerDTO)
        
        if(user){
          const authenticationDTO = {
            nickname: user?.nickname,
            email: user?.email,
            token: jwt(user?.nickname as string)
          }
          return res.status(200).json(authenticationDTO)
        }else {
          return res.status(400).json({ login: "failed" })
        }
        
      } catch (error) {
          console.log(error, "fucker")
          res.status(500).json({message: "아이디 혹은 비밀번호가 틀립니다."})
      }
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

  private tokenUser(req: Request, res: Response, next: NextFunction) {
    return res.send(res.locals.userInfo.nickname)
  }
}
