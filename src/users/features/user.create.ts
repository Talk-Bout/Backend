import User from '../../interfaces/user.interface'
import userValidator from '../../validators/user.validator'
import { validate, validateOrReject } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import UserValidationException from '../../exceptions/UserValidationException'
import UserCreationException from '../../exceptions/UserCreationException'

export default async (req: Request, res: Response, next: NextFunction) => {
  // Data Received
  const { nickname, email, password }: User = req.body
  const confirmPassword: string = req.body.confirmPassword

  // Data Validation
  const user: userValidator = new userValidator()
  user.nickname = nickname
  user.email = email
  user.password = password

  const errors = await validate(user)
  if (errors.length > 0) {
    next(new UserValidationException())
  }
  validateOrReject(user).catch(() => {
    next(new UserValidationException())
  })

  if (password != confirmPassword) {
    next(new UserValidationException())
  }

  // Create User
  const userData: User = {
    nickname,
    email,
    password
  }

  try {
    const prisma = new PrismaClient()
    const newUser = await prisma.user.create({
      data: userData
    })
    return res.status(201).json(newUser)
  } catch (err) {
    console.error(err)
    next(new UserCreationException())
  }
}
