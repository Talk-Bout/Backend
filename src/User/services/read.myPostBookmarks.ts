import { Post, PostBookmark } from '@prisma/client'
import moment from '../../Infrastructures/utils/moment'
import { prisma } from '../../Infrastructures/utils/prisma'

export default async (nickname: object) => {
  const PostBookmark = prisma.postBookmark

  type PostType = Omit<Post, 'createdAt'> & {
    createdAt: Date | string
  }

  const bookmarks = await PostBookmark.findMany({
    where: nickname,
    include: { post: { include: { user: true } } }
  })

  for (const bookmark of bookmarks) {
    if (bookmark.post) {
      const post = bookmark.post as PostType
      post.createdAt = moment(post.createdAt as Date)
    }
  }

  return bookmarks
}
