import { prisma } from '../../Infrastructures/utils/prisma'

export default async () => {
  const Post = await prisma.post
  let postWithLike = {}
  const posts = await Post.findMany({
    include: { postLike: true,
               user:true }
    
  })
  for (const post of posts ){
    post["likeNumber"] = post.postLike.length
  
  }
  posts.sort(function(a, b) {
    return b.likeNumber - a.likeNumber;
  });
  return(posts)
}




