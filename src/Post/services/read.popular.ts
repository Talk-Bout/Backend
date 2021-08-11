import { prisma } from '../../Infrastructures/utils/prisma'

export default async () => {
  const Post = prisma.post
  let postWithLike = {}

  const posts = await Post.findMany({
    include: { postLike: true,
               user:true }
    
  })

 
  for (const post of posts ){
    //console.log(post)
    //console.log(`${post.postId} has ${post.postLike.length} like`)
    post["likeNumber"] = post.postLike.length

  }
  posts.sort(function(a, b) {
    return b.likeNumber - a.likeNumber;
  });
  console.log(posts);
}




