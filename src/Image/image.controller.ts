import { Router, Request, Response } from 'express'
import { imageUpload } from '../Infrastructures/middlewares'
import { Controller } from '../Infrastructures/interfaces'

export default class ImageController implements Controller {
  public readonly path = '/images'
  public readonly router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route(this.path).post(imageUpload, this.saveImage)
  }

  private saveImage(req: Request, res: Response) {
    const imageUrl: string = `/images/${req.file?.filename}`
    return res.status(201).json(imageUrl)
  }
}
