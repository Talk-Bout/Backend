import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import cors from 'cors'
dotenv.config()


import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors({ credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 게시글 전체 불러오기
app.get('/api/posts', async (req: Request, res: Response) => {
    // 데이터 베이스에서 모든 정보를 가져옴
    console.log("asdf")
    const posts = await prisma.post.findMany()
    // 클라이언트에게 보내줌
    console.log(posts)
    res.json(posts)
})

// 내가 쓴 글 불러오기
app.get('/api/posts/:userId', (req: Request, res: Response) => {
    // 아이디 입력값 받기
    const postId = req.params.id
    // 입력받은 아이디에 해당하는 게시글 찾아 불러옴
    // 찾은 게시글들 보냄
    res.json(postId)
})

// 한 게시글 상세보기 >> 미완성 >> 불러올 내용에 좋아요 likes 추가 필요
app.get('/api/posts/:postId', async (req: Request, res: Response) => {
    // 어떤 게시글을 찾아줄지 요청 받음
    const postId = req.params.id
    console.log(postId)
    // client가 찾는 게시글 찾아서 불러옴
    const postDetail = await prisma.post.findUnique({
        where: { id: Number(postId) }
    })
    // 찾은 게시글 정보 보냄
    res.json(postDetail)
})

// 게시글 작성하기
app.post('/api/posts', async (req: Request, res: Response) => {
    // client로부터 받은 입력값의 body만 가져옴
    const { title, author, content, category } = req.body
    console.log(req.body)
    // post를 만들어 db에 저장
    const post = await prisma.post.create({
    // 스키마 모델에 각각 어떤 겂을 넣을지 지정
        data: {
            title: title,
            author: author,
            content: content, // 묻고 가자...
            categories: category
        }
    })
    console.log(post)
    // 저장된 post내용을 client로 보내줌
    res.json(post)
})

// 게시글 수정하기
app.patch('/api/posts/:postId', async (req: Request, res: Response) => {
    const { title, content } = req.body
    console.log(req.body)
    const id = req.params.postId
    const updatedPost = await prisma.post.update({
        where: {
            id: Number(id)
        },
        data: {
            title: title,
            content: content // 또 묻고 가나..?
        }
    })
    res.json(updatedPost)
})

// 게시글 삭제하기
app.delete('/api/posts/:postId', async (req: Request, res: Response) => {
    // 어떤 글을 지울 것인지 입력값을 받음
    const id = req.params.postId
    console.log(id)
    // 받은 입력값에 해당하는 게시물 삭제
    const deletePost = await prisma.post.delete({
        where: { id: Number(id) }
    })
    console.log(deletePost)
    res.json(deletePost)
})

app.listen(PORT, () => console.log('Server is running on port', PORT))
