import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import ValidationFailureException from '../exceptions/ValidationFailure.exception'
import { RequestHandler, Request, Response, NextFunction } from 'express'

export default (type: any): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const errors = await validate(plainToClass(type, req.body))
    return errors.length > 0 ? next(new ValidationFailureException()) : next()
  }
}
