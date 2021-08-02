import { PrismaClient } from ".prisma/client";
import Comment from '../../interfaces/comment.interface'

export default async function (DTO: Comment) {
    const Comment = new PrismaClient().comment
    const updateComment = Comment.update({
        where: DTO, // 무조건 object가 와야하는데..
        data: DTO //
    })

    return updateComment
}