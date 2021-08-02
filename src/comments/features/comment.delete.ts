import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '.prisma/client'
import CommentDeletionException from '../../exceptions/CommentDeletionException'

export default async function (req: Request, res: Response, next: NextFunction) {
    const { commentId } = req.body
    const Comment = new PrismaClient().comment

    if (commentId == undefined) {
        next(new CommentDeletionException())
    }

    const commentDTO = {
        commentId: parseInt(commentId)
    }

    const deleteComment = await Comment.delete({
        where: commentDTO
    }).catch(() => next(new CommentDeletionException()))

    return res.status(200).json(deleteComment)
}
