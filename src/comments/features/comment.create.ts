import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import CommentValidationException from '../../exceptions/CommentValidationException'
import PromiseRejectionException from '../../exceptions/PromiseRejectionException'

export default async function (req: Request, res: Response, next: NextFunction) {
    const { nickname, content, postId } = req.body
    // const { postId } = req.params

    if (nickname == undefined || content == undefined || postId == undefined) {
        next(new CommentValidationException())
    }

    const commentDTO = {
        nickname: nickname,
        content: content,
        postId: parseInt(postId)
    }

    const Comment = new PrismaClient().comment
    const createComment = await Comment.create({
        data: commentDTO
    }).catch(() => next(new PromiseRejectionException()))
    return res.status(201).json(createComment)
}