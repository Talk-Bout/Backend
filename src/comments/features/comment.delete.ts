import { PrismaClient } from '.prisma/client'
import Comment from '../../interfaces/comment.interface'

export default async function (DTO: Comment) {
    const Comment = new PrismaClient().comment
    const deleteComment = await Comment.delete({
        where: { Comment.postId } // object를 넣어야 할텐데..?
    })

    return deleteComment
}
