// import { PrismaClient } from '@prisma/client'
// import { Request, Response, NextFunction } from 'express'
// import PageNotFoundException from '../../exceptions/PageNotFound.exception'
// import PromiseRejectionException from '../../exceptions/PromiseRejection.exception'
// import PostNotFoundException from '../../exceptions/PostNotFound.exception'


// //  delete post 
// export default async (req: Request, res: Response, next: NextFunction) => {
//   // Data Received
//   const prisma = new PrismaClient()
//   const postId: number = parseInt(req.body.postId)

//   // find the post and delete 
  
//   try {

//     const post = await prisma.post.delete({
//         where:{
//             postId
//         },
//     }).catch(()=>next(new PostNotFoundException()))
//   } catch (error) {
//     console.error(error)
//     next(new PageNotFoundException())
//   }
// }
