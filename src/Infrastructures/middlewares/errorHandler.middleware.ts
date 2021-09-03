import { Request, Response, NextFunction } from 'express'
import HttpException from '../exceptions/Http.exception'

export default function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = error.status || 500
  const message = error.message || 'Unknown Error...'
  const meta = error.meta || 'Happy Coding! 😉'

  res.status(status).json({ status: status, message: message, meta: meta })
}
