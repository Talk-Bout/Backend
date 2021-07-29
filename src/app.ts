import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import cors from 'cors'
dotenv.config()

import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors({ credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/users', async (req: Request, res: Response) => {
  if (req.body.confirmPassword === req.body.password) {
    const userData: Prisma.UserCreateInput = {
      email: req.body.email as string,
      nickname: req.body.nickname as string,
      password: req.body.password as string
    }
    const newUser = await prisma.user.create({
      data: userData
    })
    return res.status(201).json(newUser)
  }
})

app.get('/users', async (req: Request, res: Response) => {
  if (req.query.email) {
    const email = req.query.email
    const isUserExist = await prisma.user.findFirst({
      where: { email: String(email) }
    })
    return res.status(200).json({ isExist: isUserExist })
  } else if (req.query.nickname) {
    const nickname = req.query.nickname
    const isNicknameExist = await prisma.user.findFirst({
      where: { nickname: String(nickname) }
    })
    return res.status(200).json({ isExist: isNicknameExist })
  }
})

app.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await prisma.user.findFirst({
      where: { email: email as string, password: password as string }
    })
    return res.status(200).json({ user })
  } catch (err) {
    console.log(err)
    res.send(err)
  }
})

app.listen(PORT, () => console.log('Server is running on port', PORT))
