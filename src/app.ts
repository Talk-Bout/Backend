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
  try {
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
}
catch(err){
  res.send(err)
}
})

app.get('/users', async (req: Request, res: Response) => {
  try {
  if (req.query.email) {
    const email = req.query.email
    const isUserExist = await prisma.user.findFirst({
      where: { email: String(email) }
    })
    return isUserExist && res.status(200).json({ isExist: true })
  } else if (req.query.nickname) {
    const nickname = req.query.nickname
    const isNicknameExist = await prisma.user.findFirst({
      where: { nickname: String(nickname) }
    })
    return isNicknameExist && res.status(200).json({ isExist: true })
  }}
  catch(err){
    res.send(err)
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

// 글 상세보기
app.get('/posts/:postId', async (req: Request, res: Response) => {
  try{  
  const id = req.params.postId
    const postDetail = await prisma.post.findUnique({
        where: { postId: Number(id) }
    })
    res.json(postDetail)
  }catch(err){
    res.send(err)
  }
})

// 내가 쓴 글 불러오기 & 카테고리별 게시글 불러오기 
app.get('/posts', async (req: Request, res: Response) => {
  try {  
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
    } else {
      const allPosts = await prisma.post.findMany()
      res.json(allPosts)
    }
  } catch(err){
    res.send(err)
  }
})

// 게시글 작성하기
app.post('/posts', async (req: Request, res: Response) => {
  try{
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
  } catch(err){
    res.send(err)
  }
})

// 게시글 수정하기
app.patch('/posts/:postId', async (req: Request, res: Response) => {
  try{  
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
  }catch(err){
    res.send(err)
  }
})

// 게시글 삭제하기
app.delete('/posts/:postId', async (req: Request, res: Response) => {
  try{  
  const id = req.params.postId
    console.log(`삭제할 게시글 번호: ${id}`)
    const deletePost = await prisma.post.delete({
        where: { postId: Number(id) }
    })
    console.log('삭제완료!')
    res.json(deletePost)
  }catch(err){
    res.send(err)
  }
})

// 북마크 추가하기
app.post('/users/:nickname/bookmark', async (req: Request, res: Response) => {
  try{  
  const postId: number = Number(req.body.postId)
    const nickname = req.params.nickname
    const bookmark = await prisma.bookmark.create({
        data: {
            postId: postId,
            nickname: nickname
        }
    })
    res.json(bookmark)
  }catch(err){
    res.send(err)
  }
})

// 북마크 불러오기
app.get('/users/:nickname/bookmark', async (req: Request, res: Response) => {
  try{  
  const nickname = req.params.nickname
    const bookMarkByNickname = await prisma.bookmark.findMany({
        where: { nickname: nickname }
    })
    res.json(bookMarkByNickname)
  }catch(err){
    res.send(err)
  }
})

// 좋아요
app.post('/posts/:postId/like', async (req:Request, res:Response) => {
  try{
  const postId: number = Number(req.params.postId)
  const nickname = req.body.nickname
  const like = req.body.like

  if (like == true) {
    const liked = await prisma.like.create({
      data: {
        postId: postId,
        nickname: nickname
      }
    })
    res.json({like: true})
  }

  else if (like == false) {
    const liked = await prisma.like.delete({
      where: {
        postId: postId,
        nickname: nickname
      } as Prisma.LikeWhereUniqueInput
    })
    res.json({like: "deleted"})
  }
}catch(err){
  res.send(err)
}
})

app.post('/posts/:postId/comments', async (req: Request, res: Response) => {
  try{ 
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
}catch(err){
  res.send(err)
}
})

app.get('/posts/:postId/comments', async (req: Request, res: Response) => {
  try{
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
}catch(err){
  res.send(err)
}
})

app.patch('/posts/:postId/comments/:commentId', async (req: Request, res: Response) => {
  try{
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
  }catch(err){
    res.send(err)
  }
})

app.delete('/posts/:postId/comments/:commentId', async (req: Request, res: Response) => {
  try{
  const postId : number = parseInt(req.params.postId)
  const commentId : number = parseInt(req.params.commentId)
  let deleteComment = await prisma.comment.delete({
      where:{
        commentId
      },
    })
  res.status(200).json({msg: "deleted"})
  }catch(err){
    res.send(err)
  }
})
app.listen(PORT, () => console.log('Server is running on port', PORT))
