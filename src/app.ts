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
=======

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


// 글 상세보기
app.get('/posts/:postId', async (req: Request, res: Response) => {
    const id = req.params.postId
    const postDetail = await prisma.post.findUnique({
        where: { postId: Number(id) }
    })
    res.json(postDetail)
})

// 내가 쓴 글 불러오기 & 카테고리별 게시글 불러오기 
app.get('/posts', async (req: Request, res: Response) => {
    const category = req.query.category
    if (req.query.nickname) {
        const user = req.query.nickname
        const postsByUser = await prisma.post.findMany({
            where: { nickname: String(user) }
        })
        res.json(postsByUser)
    } else if (req.query.category) {
        const postsByCategory = await prisma.post.findMany({
            where: { category: String(category) }
        })
        res.json(postsByCategory)
    }
})

// 게시글 작성하기
app.post('/posts', async (req: Request, res: Response) => {
    const { nickname, title, content, category } = req.body
    const post = await prisma.post.create({
        data: {
            nickname: nickname,
            category: category,
            title: title,
            content: content
        }
    })
    console.log('게시글 작성완료!')
    res.json(post)
})

// 게시글 수정하기
app.patch('/posts/:postId', async (req: Request, res: Response) => {
    const { title, content } = req.body
    const id = req.params.postId
    const updatedPost = await prisma.post.update({
        where: { postId: Number(id) },
        data: {
            title: title,
            content: content
        }
    })
    console.log('수정완료!')
    res.json(updatedPost)
})

// 게시글 삭제하기
app.delete('/posts/:postId', async (req: Request, res: Response) => {
    const id = req.params.postId
    console.log(`삭제할 게시글 번호: ${id}`)
    const deletePost = await prisma.post.delete({
        where: { postId: Number(id) }
    })
    console.log('삭제완료!')
    res.json(deletePost)
})

// 북마크 추가하기
app.post('/users/:postId/bookmark', async (req: Request, res: Response) => {
    const post = req.params.postId
    const user = req.body.nickname
    const bookmark = await prisma.bookmark.create({
        data: {
            postId: Number(post),
            nickname: user
        }
    })
    res.json(bookmark)
})

// 북마크 불러오기
app.get('/users/:nickname/bookmark', async (req: Request, res: Response) => {
    const nickname = req.params.nickname
    console.log(nickname)
    const bookMarkByNickname = await prisma.bookmark.findMany({
        where: { nickname: nickname }
    })
    res.json(bookMarkByNickname)

})

app.listen(PORT, () => console.log('Server is running on port', PORT))
