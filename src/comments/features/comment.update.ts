import { PrismaClient } from ".prisma/client";
import { Request, Response, NextFunction } from "express";
import CommentDeletionException from "../../../exceptions/CommentDeletion.exception";

export default async function (req: Request, res: Response, next: NextFunction) {
    // const { commentId } = req.params
    const { commentId, title, content } = req.body
    const Comment = new PrismaClient().comment

    if (commentId == undefined) {
        next(new CommentDeletionException())
    }

    const commentDTO = {
        commentId: parseInt(commentId),
        title: title,
        content: content
    }

    const updateComment = Comment.update({
        where: { commentId: parseInt(commentId) },
        data: commentDTO
    }).catch(() => next(new CommentDeletionException()))

    return res.status(200).json(updateComment)
}