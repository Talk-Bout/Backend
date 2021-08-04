import express from 'express'
import controller from './interfaces/controller.interface'
import cors from 'cors'
import morgan from 'morgan'
import errorMiddleware from './middlewares/errorHandler.middleware'
import log from './utils/log'
import 'dotenv/config'

export default class App {
  public app: express.Application
  public port: number

  constructor(controllers: Array<controller>) {
    this.app = express()
    this.port = Number(process.env.PORT)

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
    this.app.listen(port, () => log(port))
  }
}
