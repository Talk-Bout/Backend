import express from 'express'
import cors from 'cors'
import controller from './interfaces/controller.interface'
import errorMiddleware from './middlewares/error.middleware'
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
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors({ credentials: true }))
  }

  private initializeControllers(controllers: Array<controller>) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router)
    })
  }

  private initializeErrorHandler() {
    this.app.use(errorMiddleware)
  }

  private listen(port: number) {
    this.app.listen(port, () =>
      console.log(
        '\t #################################################',
        '\n',
        `\t\t 🔥 App is burning on port ${port} 🔥`,
        '\n',
        '\t #################################################'
      )
    )
  }
}
