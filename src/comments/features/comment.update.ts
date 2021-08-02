import { PrismaClient } from ".prisma/client";
import Comment from '../../interfaces/comment.interface'

export default async function (DTO: any) { // 이 부분 왜 any 써야하는지 여전히 의문?
    const Comment = new PrismaClient().comment
    const updateComment = Comment.update({
        where: DTO,
        data: DTO
    })

    return updateComment
}