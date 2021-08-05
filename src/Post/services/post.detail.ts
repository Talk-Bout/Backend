import { prisma } from '../../Infrastructures/utils/prisma'
import readDetailValidator from '../validators/readDetail.validator'

export default (DTO: readDetailValidator) => {
  const Post = prisma.post

  
  const targetPost = Post.update({
    where:{postId: DTO.postId},
    data:{
      viewCount:{
        increment:1,
      },
    }
  })
  return targetPost
  
 // const target = prisma.post.findUnique({where:{postId: DTO.postId}})
 // target.$executeRaw(`update "Post"set viewCount = viewCount+1 where id = ${DTO.postId} `)
  // .then((targetPost)=>{return targetPost})

  // Post.findUnique({where: {postId: DTO.postId}})
  // .then((targetPost)=>{
  //   console.log(targetPost)
  //   prisma.$executeRaw(`update "Post"set viewCount = viewCount+1 where id = ${DTO.postId} `)
  //   return targetPost
  // })
 

}
