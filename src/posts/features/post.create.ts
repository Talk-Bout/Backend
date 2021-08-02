import Post from '../../interfaces/post.interface'
import { PrismaClient } from '@prisma/client'

export default async (DTO: Post) => {
  const Post = new PrismaClient().post

  return await Post.create({
    data: DTO
  })
}
