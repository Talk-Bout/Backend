import moment from '../../Infrastructures/utils/moment'
import { prisma } from '../../Infrastructures/utils/prisma'

export default async (nickname: object) => {
  const CommunityBookmark = prisma.communityBookmark
  const bookmarks = (await CommunityBookmark.findMany({
    where: nickname,
    include: { community: true }
  })) as any[]

  return bookmarks
}
