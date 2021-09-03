import express from 'express'
import controller from './interfaces/controller.interface'
import cors from 'cors'
import morgan from 'morgan'
import errorMiddleware from './middlewares/errorHandler.middleware'
import log from './utils/log'
import passportConfig from '../Auth/passports'
import helmet from 'helmet'
import 'dotenv/config'
import pageNotFoundMiddleware from './middlewares/pageNotFound.middleware'

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
    this.app.use(helmet())
    this.app.use(
      cors({
        credentials: true,
        origin: ['http://localhost:3000', 'https://talkbout.camp'],
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
      })
    )
    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    passportConfig()
  }

  private initializeControllers(controllers: Array<controller>) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router)
    })
  }

  private initializeErrorHandler() {
    this.app.use(errorMiddleware)
    this.app.use(pageNotFoundMiddleware())
  }

  private listen(port: number) {
    this.app.listen(this.port, () => log(this.port))
  }
}
