import { prisma } from '../../Infrastructures/utils/prisma'
import postWithLikeCnt from '../../Infrastructures/interfaces/postWithLikeCnt'

export default async () => {
  const Post = await prisma.post
  let postWithLike = {}
  const posts = await Post.findMany({
    include: {
      postLike: true,
      user:true      
    }
    
  }) as Array<postWithLikeCnt>

  for (const post of posts ){
    post["likeNumber"] = post.postLike?.length 
  
  }

  let result: Array<postWithLikeCnt> = posts
  result.sort(function (a,b ){
      return Number(b.likeNumber) - Number(a.likeNumber) 
    })
  return(result)
}
