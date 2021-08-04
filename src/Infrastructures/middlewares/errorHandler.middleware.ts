import { Request, Response, NextFunction, response } from 'express'
import HttpException from '../exceptions/Http.exception'

export default function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = error.status || 500
  const message = error.message || 'Unknown Error... Happy Coding!'
  console.log(status, message)
  res.status(status).send({
    status,
    message
  })
}
