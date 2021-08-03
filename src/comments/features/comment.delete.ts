import { PrismaClient } from '.prisma/client'
import Comment from '../../interfaces/comment.interface'

export default async function (DTO: any) {
    const Comment = new PrismaClient().comment
    const deleteComment = await Comment.delete({
        where: DTO
    })

    return deleteComment
}
