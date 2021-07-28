import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import cors from 'cors'
dotenv.config()


import { PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors({ credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.listen(PORT, () => console.log('Server is running on port', PORT))
