import { NextFunction } from 'express'
import { PromiseRejectionException } from '../exceptions'

export default (err: Error, next: NextFunction) => {
  console.error(err)
  next(new PromiseRejectionException())
}
