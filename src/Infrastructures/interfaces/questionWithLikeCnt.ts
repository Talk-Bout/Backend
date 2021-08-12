import { Answer, PostBookmark, PostComment, PostLike, QuestionBookmark, QuestionLike } from "@prisma/client";


export default interface postWithLikeCnt {
   questionId: number
   createdAt: Date | string
   viewCount : number
   title: string
   content: string
   image?: string
   user: object
   answer?: Array<Answer>
   questionLike?:Array<QuestionLike>
   questionBookmark?: Array<QuestionBookmark>
   likeNumber?: number


}
