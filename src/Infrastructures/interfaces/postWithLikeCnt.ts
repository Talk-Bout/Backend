import { PostBookmark, PostComment, PostLike } from "@prisma/client";


export default interface postWithLikeCnt {
   postId: number
   createdAt: Date | string
   viewCount : number
   title: string
   content: string
   category: string
   image?: string
   user: object
   postLike?: Array<PostLike>
   postBookmark?: Array<PostBookmark>
   postComment?: Array<PostComment>
   likeNumber?: number


}
