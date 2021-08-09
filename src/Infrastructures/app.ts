import express from 'express'
import controller from './interfaces/controller.interface'
import cors from 'cors'
import morgan from 'morgan'
import errorMiddleware from './middlewares/errorHandler.middleware'
import log from './utils/log'
import 'dotenv/config'
const passportConfig = require("../Infrastructures/middlewares/passportStrategy1")

import * as passport from 'passport'
import './middlewares/passportStrategy1'
 
export default class App {
  public app: express.Application
  public port: number

  constructor(controllers: Array<controller>) {
    this.app = express()
    this.port = Number(process.env.PORT) || 3000

    this.initializeMiddlewares()
    this.initializeControllers(controllers)
    this.initializeErrorHandler()
    this.listen(this.port)
  }

  private initializeMiddlewares() {
    this.app.use(morgan('dev'))
    this.app.use(cors({ credentials: true }))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    //require('./config/passport')(passport);
    passportConfig()
    this.app.use(passport.initialize())
    this.app.use(passport.session());
    
  }

  private initializeControllers(controllers: Array<controller>) {
    this.app.use('/images', express.static('uploads'))

    controllers.forEach((controller) => {
      this.app.use('/', controller.router)
    })
  }

  private initializeErrorHandler() {
    this.app.use(errorMiddleware)
  }

  private listen(port: number) {
    this.app.listen(this.port, () => log(this.port))
  }
}
