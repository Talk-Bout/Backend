import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '.prisma/client'
import AuthenticationException from '../exceptions/Authentication.exception'
import 'dotenv/config'
import WhoAreYouException from '../exceptions/WhoAreYou.exception'

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  const [authType, authToken] = (authorization || '').split(' ')

  if (!authToken || authType !== 'Bearer') {
    return next(new AuthenticationException())
  }

  const User = new PrismaClient().user
  const HASH_KEY = process.env.HASH_KEY as string
  const jwtWhy = jwt.verify(authToken, HASH_KEY) as string

  const user = await User.findUnique({
    where: { nickname: Object.values(jwtWhy)[0] }
  }).catch(() => next(new AuthenticationException()))

  if (user?.nickname != req.body.nickname) {
    next(new WhoAreYouException())
  }

  next()
}