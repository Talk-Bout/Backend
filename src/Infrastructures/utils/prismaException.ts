import { NextFunction } from 'express'
import PrismaException from '../exceptions/PrismaRejection.exception'

type PrismaError = Error & {
  meta?: object
  code: string
}

export default (err: PrismaError, next: NextFunction) => {
  console.log(err.code, err)

  if (err.code == 'P2000') {
    return next(new PrismaException(400, 'The value is too long', err.meta as object))
  }

  if (err.code == 'P2003') {
    return next(new PrismaException(409, 'Foreign key constraint', err.meta as object))
  }

  if (err.code == 'P2025') {
    return next(new PrismaException(404, 'Record not found', undefined))
  }

  if (err.code == 'P2027') {
    return next(new PrismaException(500, 'Multiple errors', err.meta as object))
  }

  if (err.code == undefined) {
    return next(new PrismaException(400, 'Unknown error, maybe URL params', undefined))
  }

  return next(new PrismaException(500, 'Unknown error, call me at Gather', undefined))
}
