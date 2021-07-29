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

// comment 
app.post('/posts/:postId/comments', async (req: Request, res: Response) => {
   
    let {content} = req.body
    let {nickname} = req.body
    let {postId } = req.params
    let user = await prisma.user.findUnique({
      where:{
        nickname
      },
    })
    let post = await prisma.post.findUnique({
        where:{
          postId : Number(postId)
        },
    })
    const newComment = await prisma.comment.create({
      data: {
        content, nickname,  postId: Number(postId)
      }
    })
    res.status(201).json(newComment)
  })

app.get('/posts/:postId/comment', async (req: Request, res: Response) => {
    let {postId} = req.params

    let post = await prisma.post.findUnique({
        where:{
          postId : Number(postId)
        },
    })

    if (post){
        const comments = await prisma.comment.findMany({
            where: {
                postId: Number(postId)
            }
        })

        res.status(200).json(comments)
    }else{
        res.status(400).send(" Wrong postId")
    }
    
  })

app.patch('/posts/:postId/comments/:commentId', async (req: Request, res: Response) => {
    
    const postId : number = parseInt(req.params.postId)
    const commentId : number = parseInt(req.params.commentId)
    const {content } = req.body

    let updateComment = await prisma.comment.update({
        where:{
          commentId
        },
        data:{
            content
        }
      })
    res.status(200).json(updateComment)
})

app.delete('/posts/:postId/comments/:commentId', async (req: Request, res: Response) => {
    
    const postId : number = parseInt(req.params.postId)
    const commentId : number = parseInt(req.params.commentId)
    let deleteComment = await prisma.comment.delete({
        where:{
          commentId
        },
      })
    res.status(200).json({msg: "deleted"})
})

app.listen(PORT, () => console.log('Server is running on port', PORT))
