import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import cors from 'cors'
dotenv.config()


import { PrismaClient } from '@prisma/client'
import { nextTick } from 'process'
const prisma = new PrismaClient()

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors({ credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 게시글 전체 불러오기
app.get('/api/posts', async (req: Request, res: Response) => {
    const posts = await prisma.post.findMany()
    res.json(posts)
})

// 내가 쓴 글 불러오기 >> 작성 중
// app.get('/api/posts/:userId', (req: Request, res: Response) => {
//     // 아이디 입력값 받기
//     const postId = req.params.id
//     // 입력받은 아이디에 해당하는 게시글 찾아 불러옴

//     // 찾은 게시글들 보냄
//     res.json(postId)
// })

// 글 상세보기 >> 미완성 >> 불러올 내용에 좋아요 likes 추가 필요
// app.get('/api/posts/:postId', async (req: Request, res: Response) => {
//     // 어떤 게시글을 찾아줄지 요청 받음
//     const postId = req.params.id
//     console.log(postId)
//     // client가 찾는 게시글 찾아서 불러옴
//     const postDetail = await prisma.post.findUnique({
//         where: { id: Number(postId) }
//     })
//     // 찾은 게시글 정보 보냄
//     res.json(postDetail)
// })

// 게시글 작성하기
app.post('/api/posts', async (req: Request, res: Response) => {
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
app.patch('/api/posts/:postId', async (req: Request, res: Response) => {
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
app.delete('/api/posts/:postId', async (req: Request, res: Response) => {
    const id = req.params.postId
    console.log('삭제할 게시글 번호: ' + id)
    const deletePost = await prisma.post.delete({
        where: { postId: Number(id) }
    })
    console.log('삭제완료!')
    res.json(deletePost)
})

app.listen(PORT, () => console.log('Server is running on port', PORT))
