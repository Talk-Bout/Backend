import { Router, Request, Response, NextFunction } from 'express'
import { imageUpload } from '../Infrastructures/middlewares'
import authenticate from '../Infrastructures/middlewares/authentication.middleware'
import { Controller } from '../Infrastructures/interfaces'
import { uploadFile } from '../Infrastructures/s3'
import sharp from 'sharp'
import fs from 'fs'
import util from 'util'
import S3 from 'aws-sdk/clients/s3'
import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders'

export default class ImageController implements Controller {
  public readonly path = '/api/images'
  public readonly router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route(this.path).post(imageUpload, this.saveImage)
    this.router.route(this.path + '/:key').get(this.getImage)
  }

  private async saveImage(req: Request, res: Response, next: NextFunction) {
    const file = req.file
    const original = await uploadFile(file).catch((err) => next(err))

    type Compressed = sharp.OutputInfo & { path: string; filename: string }
    const Cfile: Compressed = (await sharp(req.file?.path)
      .webp({ quality: 20 })
      .withMetadata()
      .toFile('./uploads/C' + file?.filename)
      .catch((err) => next(err))) as Compressed
    // Cfile.path = `uploads\\C${file?.filename}`
    Cfile.path = `uploads/C${file?.filename}`
    Cfile.filename = `C${file?.filename}`
    const compressed = await uploadFile(Cfile).catch((err) => next(err))

    const unlinkFile = util.promisify(fs.unlink)
    await unlinkFile(file?.path as fs.PathLike)
    await unlinkFile(Cfile?.path as fs.PathLike)

    return res.status(201).send(`/api/images/${compressed?.Key}`)
  }

  private async getImage(req: Request, res: Response) {
    const bucketName = process.env.AWS_BUCKET_NAME
    const region = process.env.AWS_BUCKET_REGION
    const accessKeyId = process.env.AWS_ACCESS_KEY
    const secretAccessKey = process.env.AWS_SECRET_KEY
    const key = req.params.key

    const s3 = new S3({
      region,
      accessKeyId,
      secretAccessKey
    })

    const downloadParams = {
      Key: key,
      Bucket: bucketName as string
    }

    return s3.getObject(downloadParams, (err, data) => {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' })
      res.write(data.Body, 'binary')
      res.end(null, 'binary')
    })
  }
}
